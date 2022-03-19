use wasm_bindgen::prelude::*;

mod utils;

pub mod game_of_life;
pub mod tree_of_pythagoras;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {}
