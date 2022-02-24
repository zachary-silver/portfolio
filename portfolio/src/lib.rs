mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    rows: u32,
    columns: u32,
    cells: Vec<Cell>,
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.columns + column) as usize
    }

    fn get_living_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;

        for row_delta in [self.rows - 1, 0, 1] {
            for column_delta in [self.columns - 1, 0, 1] {
                if row_delta == 0 && column_delta == 0 {
                    continue;
                }

                let neighboring_row = (row + row_delta) % self.rows;
                let neighboring_column = (column + column_delta) % self.columns;
                let i = self.get_index(neighboring_row, neighboring_column);

                count += self.cells[i] as u8;
            }
        }

        count
    }

    fn calculate_left(&self, i: u64) -> u64 {
        let columns = self.columns as u64;
        if i % columns == 0 {
            i + columns - 1
        } else {
            i - 1
        }
    }

    fn calculate_right(&self, i: u64) -> u64 {
        let columns = self.columns as u64;
        if i % columns == columns - 1 {
            i + 1 - columns
        } else {
            i + 1
        }
    }

    fn get_living_neighbors(&self, i: u64) -> u8 {
        let row = i / self.columns as u64;
        let column = i % self.columns as u64;

        let left = if column == 0 {
            i + self.columns as u64 - 1
        } else {
            i - 1
        };
        let right = if column == self.columns as u64 - 1 {
            i + 1 - self.columns as u64
        } else {
            i + 1
        };
        let top = if row == 0 {
            (self.columns * (self.rows - 1)) as u64 + i
        } else {
            i - self.columns as u64
        };
        let bottom = if row == self.rows as u64 - 1 {
            column
        } else {
            i + self.columns as u64
        };
        let upper_left = self.calculate_left(top);
        let upper_right = self.calculate_right(top);
        let lower_left = self.calculate_left(bottom);
        let lower_right = self.calculate_right(bottom);

        return self.cells[upper_left as usize] as u8
            + self.cells[top as usize] as u8
            + self.cells[upper_right as usize] as u8
            + self.cells[left as usize] as u8
            + self.cells[right as usize] as u8
            + self.cells[lower_left as usize] as u8
            + self.cells[bottom as usize] as u8
            + self.cells[lower_right as usize] as u8;
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn tick(&mut self) {
        let mut next_universe = self.cells.clone();

        for i in 0..self.rows * self.columns {}
    }
}
