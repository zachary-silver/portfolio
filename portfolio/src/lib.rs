use std::fmt;

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

    fn get_living_neighbor_count(&self, i: u64) -> u8 {
        let row = (i / self.columns as u64) as u32;
        let column = (i % self.columns as u64) as u32;
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

    fn get_left_neighbor(&self, i: u64) -> u64 {
        let columns = self.columns as u64;
        if i % columns == 0 {
            i + columns - 1
        } else {
            i - 1
        }
    }

    fn get_right_neighbor(&self, i: u64) -> u64 {
        let columns = self.columns as u64;
        if i % columns == columns - 1 {
            i + 1 - columns
        } else {
            i + 1
        }
    }

    fn get_living_neighbors(&self, i: u64) -> u8 {
        let rows = self.rows as u64;
        let columns = self.columns as u64;
        let row = i / columns;
        let column = i % columns;

        let left = if column == 0 { i + columns - 1 } else { i - 1 };
        let right = if column == columns - 1 {
            i + 1 - columns
        } else {
            i + 1
        };
        let top = if row == 0 {
            columns * (rows - 1) + i
        } else {
            i - columns
        };
        let bottom = if row == rows - 1 { column } else { i + columns };
        let upper_left = self.get_left_neighbor(top);
        let upper_right = self.get_right_neighbor(top);
        let lower_left = self.get_left_neighbor(bottom);
        let lower_right = self.get_right_neighbor(bottom);

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
    pub fn new(rows: u32, columns: u32) -> Self {
        let cells = (0..rows * columns)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            rows,
            columns,
            cells,
        }
    }

    pub fn tick(&mut self) {
        let mut next_cells = self.cells.clone();

        for i in 0..self.rows * self.columns {
            let i = i as usize;
            let cell = self.cells[i];
            let living_neighbors = self.get_living_neighbor_count(i as u64);

            let next_cell = match (cell, living_neighbors) {
                (_, 3) | (Cell::Alive, 2) => Cell::Alive,
                (_, _) => Cell::Dead,
            };

            next_cells[i] = next_cell;
        }

        self.cells = next_cells;
    }

    pub fn render(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for row in 0..self.rows {
            for column in 0..self.columns {
                let i = self.get_index(row, column);
                let icon = if self.cells[i] == Cell::Alive {
                    '1'
                } else {
                    '0'
                };
                write!(f, "{}", icon)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}
