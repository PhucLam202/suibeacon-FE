module suibeacon::suibeacon {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::clock::{Self, Clock};
    use std::string::{Self, String};
    use sui::event;
    use sui::transfer;


    public struct MemberNFT has key, store {
        id: UID,
        user_address: address,
        project_name: String,
        blob_id: String,
        join_date: u64,
        image_url: String,
    }

    public struct Registry has key {
        id: UID,
        minted: Table<address, u64>,
    }

    public struct NFTMinted has copy, drop {
        recipient: address,
        user_address: String,
        project_name: String,
        blob_id: String,
        image_url: String,
    }

    fun init(ctx: &mut TxContext) {
        let registry = Registry {
            id: object::new(ctx),
            minted: table::new(ctx),
        };
        transfer::share_object(registry);
    }

    public entry fun mint(
        user_address: vector<u8>,
        project_name: vector<u8>,
        blob_id: vector<u8>,
        registry: &mut Registry,
        image_url: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);

        if (table::contains(&registry.minted, sender)) {
            let mint_count = table::borrow_mut(&mut registry.minted, sender);
            *mint_count = *mint_count + 1;
        } else {
            table::add(&mut registry.minted, sender, 1);
        };

        let user_address_str = string::utf8(user_address);
        let project_str = string::utf8(project_name);
        let blob_str = string::utf8(blob_id);
        let picture_str = string::utf8(image_url);
        let nft = MemberNFT {
            id: object::new(ctx),
            user_address: sender,
            project_name: project_str,
            blob_id: blob_str,
            join_date: clock::timestamp_ms(clock),
            image_url: picture_str, 
        };

        transfer::public_transfer(nft, sender);

        event::emit(NFTMinted {
            recipient: sender,
            user_address: user_address_str,
            project_name: project_str,
            blob_id: blob_str,
            image_url: picture_str,
        });
    }

    public fun get_mint_count(registry: &Registry, addr: address): u64 {
        if (table::contains(&registry.minted, addr)) {
            *table::borrow(&registry.minted, addr)
        } else {
            0
        }
    }
}
