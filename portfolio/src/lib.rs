use std::fmt;

use wasm_bindgen::prelude::*;

use js_sys::Math::random;

mod utils;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {}

type CellCluster = u8;

const CELLS_PER_CLUSTER: u32 = 8;

#[wasm_bindgen]
pub struct Universe {
    rows: u32,
    columns: u32,
    cell_clusters: Vec<CellCluster>,
    cell_offset: usize,
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct CellPosition {
    cluster_index: usize,
    cell_index: usize,
}

impl CellPosition {
    fn get_cell_number(&self) -> usize {
        self.cluster_index * CELLS_PER_CLUSTER as usize + self.cell_index
    }
}

impl Universe {
    fn get_cell_position(cell_number: usize) -> CellPosition {
        CellPosition {
            cluster_index: cell_number / CELLS_PER_CLUSTER as usize,
            cell_index: cell_number % CELLS_PER_CLUSTER as usize,
        }
    }

    fn get_cell_number(&self, row: u32, column: u32) -> usize {
        (row * self.columns + column) as usize
    }

    fn get_cell_value(&self, cell_position: CellPosition) -> u8 {
        self.cell_clusters[cell_position.cluster_index] >> cell_position.cell_index & 1
    }

    fn set_cell_value(&mut self, cell_position: CellPosition, value: u8) {
        let cluster_mask: u8 = !(1 << cell_position.cell_index);
        let mut cell_cluster = self.cell_clusters[cell_position.cluster_index];
        cell_cluster = (cell_cluster & cluster_mask) | (value << cell_position.cell_index);
        self.cell_clusters[cell_position.cluster_index] = cell_cluster;
    }

    fn get_upper_and_lower_positions(&self, cell_number: usize) -> (CellPosition, CellPosition) {
        let rows = self.rows as usize;
        let columns = self.columns as usize;
        let row = cell_number / columns;

        if row == 0 {
            (
                Universe::get_cell_position(columns * (rows - 1) + cell_number),
                Universe::get_cell_position(cell_number + columns),
            )
        } else if row == rows - 1 {
            (
                Universe::get_cell_position(cell_number - columns),
                Universe::get_cell_position(cell_number % columns),
            )
        } else {
            (
                Universe::get_cell_position(cell_number - columns),
                Universe::get_cell_position(cell_number + columns),
            )
        }
    }

    fn get_left_and_right_positions(&self, cell_number: usize) -> (CellPosition, CellPosition) {
        let columns = self.columns as usize;
        let column = cell_number % columns;

        if column >= columns - 2 {
            (
                Universe::get_cell_position(cell_number - 2),
                Universe::get_cell_position(cell_number + 2 - columns),
            )
        } else if column <= 1 {
            (
                Universe::get_cell_position(cell_number + columns - 2),
                Universe::get_cell_position(cell_number + 2),
            )
        } else {
            (
                Universe::get_cell_position(cell_number - 2),
                Universe::get_cell_position(cell_number + 2),
            )
        }
    }

    fn get_living_neighbors(&self, cell_number: usize) -> u8 {
        let (upper, lower) = self.get_upper_and_lower_positions(cell_number);
        let (left, right) = self.get_left_and_right_positions(cell_number);
        let (upper_cell_number, lower_cell_number) =
            (upper.get_cell_number(), lower.get_cell_number());
        let (upper_left, upper_right) = self.get_left_and_right_positions(upper_cell_number);
        let (lower_left, lower_right) = self.get_left_and_right_positions(lower_cell_number);

        return self.get_cell_value(upper_left)
            + self.get_cell_value(upper)
            + self.get_cell_value(upper_right)
            + self.get_cell_value(left)
            + self.get_cell_value(right)
            + self.get_cell_value(lower_left)
            + self.get_cell_value(lower)
            + self.get_cell_value(lower_right);
    }

    fn get_random_cell_cluster(_: u32) -> CellCluster {
        let mut cluster: CellCluster = 0;

        for cell_index in (0..8).step_by(2) {
            if (random() * 5.0) as u8 == 0 {
                cluster |= 1 << cell_index;
            }
        }

        cluster
    }
}

#[wasm_bindgen]
impl Universe {
    pub fn new(rows: u32, columns: u32) -> Self {
        if rows < 4 || columns < 4 {
            panic!("Universes must be at least 4x4 in size");
        }
        let columns = columns * 2;
        let cell_cluster_count = (rows * columns + (CELLS_PER_CLUSTER - 1)) / CELLS_PER_CLUSTER;
        let cell_clusters = (0..cell_cluster_count)
            .map(Universe::get_random_cell_cluster)
            .collect();

        Universe {
            rows,
            columns,
            cell_clusters,
            cell_offset: 0,
        }
    }

    pub fn tick(&mut self) {
        let start = 0 + self.cell_offset;
        let stop = (self.rows * self.columns) as usize;
        let next_cell_index_offset = if self.cell_offset == 1 { -1 } else { 1 };

        for cell_number in (start..stop).step_by(2) {
            let cell_position = Universe::get_cell_position(cell_number);
            let cell_value = self.get_cell_value(cell_position);
            let living_neighbors = self.get_living_neighbors(cell_number);

            let next_cell_value = match (cell_value, living_neighbors) {
                (_, 3) | (1, 2) => 1,
                (_, _) => 0,
            };

            let next_cell_number = (cell_number as i64 + next_cell_index_offset) as usize;
            let next_cell_position = Universe::get_cell_position(next_cell_number);
            self.set_cell_value(next_cell_position, next_cell_value);
        }

        self.cell_offset = (self.cell_offset + 1) % 2;
    }

    pub fn rows(&self) -> u32 {
        self.rows
    }

    pub fn columns(&self) -> u32 {
        self.columns
    }

    pub fn cell_offset(&self) -> usize {
        self.cell_offset
    }

    pub fn cell_clusters(&self) -> *const CellCluster {
        self.cell_clusters.as_ptr()
    }

    pub fn cells_per_cluster(&self) -> u32 {
        CELLS_PER_CLUSTER
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let starting_column = 0 + self.cell_offset as u32;

        for row in 0..self.rows {
            for column in (starting_column..self.columns).step_by(2) {
                let cell_number = self.get_cell_number(row, column);
                let cell_position = Universe::get_cell_position(cell_number);
                let cell_value = self.get_cell_value(cell_position);
                let icon = match cell_value {
                    1 => '◼',
                    _ => '◻',
                };
                write!(f, "{}", icon)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}
