use std::fmt;

// use rand::Rng;

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
    cell_offset: usize,
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.columns + column) as usize
    }

    fn get_upper_and_lower_indices(&self, i: usize) -> (usize, usize) {
        let rows = self.rows as usize;
        let columns = self.columns as usize;
        let row = i / columns;

        if row == 0 {
            (columns * (rows - 1) + i, i + columns)
        } else if row == rows - 1 {
            (i - columns, i % columns)
        } else {
            (i - columns, i + columns)
        }
    }

    fn get_left_and_right_indices(&self, i: usize) -> (usize, usize) {
        let columns = self.columns as usize;
        let column = i % columns;

        if column >= columns - 2 {
            (i - 2, i + 2 - columns)
        } else if column <= 1 {
            (i + columns - 2, i + 2)
        } else {
            (i - 2, i + 2)
        }
    }

    fn get_living_neighbors(&self, i: usize) -> u8 {
        let (upper, lower) = self.get_upper_and_lower_indices(i);
        let (left, right) = self.get_left_and_right_indices(i);
        let (upper_left, upper_right) = self.get_left_and_right_indices(upper);
        let (lower_left, lower_right) = self.get_left_and_right_indices(lower);

        return self.cells[upper_left] as u8
            + self.cells[upper] as u8
            + self.cells[upper_right] as u8
            + self.cells[left] as u8
            + self.cells[right] as u8
            + self.cells[lower_left] as u8
            + self.cells[lower] as u8
            + self.cells[lower_right] as u8;
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn new(rows: u32, columns: u32) -> Self {
        if rows < 3 || columns < 3 {
            panic!("Universes must be at least 3x3 in size");
        }
        // let mut rng = rand::thread_rng();
        let columns = columns * 2;
        let cells = (0..rows * columns)
            .map(|i| {
                if (i / 2) % 2 == 0 || (i / 2) % 7 == 0 {
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
            cell_offset: 0,
        }
    }

    pub fn tick(&mut self) {
        let start = 0 + self.cell_offset;
        let stop = (self.rows * self.columns) as usize;
        let next_cell_index_offset = if self.cell_offset == 1 { -1 } else { 1 };

        for i in (start..stop).step_by(2) {
            let cell = self.cells[i];
            let living_neighbors = self.get_living_neighbors(i);

            let next_cell = match (cell, living_neighbors) {
                (_, 3) | (Cell::Alive, 2) => Cell::Alive,
                (_, _) => Cell::Dead,
            };

            let next_cell_index = (i as i64 + next_cell_index_offset) as usize;
            self.cells[next_cell_index] = next_cell;
        }

        self.cell_offset = (self.cell_offset + 1) % 2;
    }

    pub fn render(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let starting_column = 0 + self.cell_offset as u32;

        for row in 0..self.rows {
            for column in (starting_column..self.columns).step_by(2) {
                let i = self.get_index(row, column);
                let icon = match self.cells[i] {
                    Cell::Alive => '◼',
                    _ => '◻',
                };
                write!(f, "{}", icon)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}
