use std::f32::consts::PI;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct TreeTrunk {
    width: u32,
    height: u32,
    depth: u32,
    left_angle: f32,
    right_angle: f32,
    left_ratio: f32,
    right_ratio: f32,
}

#[wasm_bindgen]
impl TreeTrunk {
    pub fn new(width: u32, height: u32) -> Self {
        TreeTrunk {
            width,
            height,
            depth: 0,
            left_angle: 0.0,
            right_angle: 0.0,
            left_ratio: 0.0,
            right_ratio: 0.0,
        }
    }

    pub fn update(&mut self, x: f32, y: f32, max_depth: u32) {
        let ratio = max(0.35, min(0.65, x / self.width as f32));
        let depth = max(
            0,
            min(
                max_depth,
                (2.0 * max_depth as f32 * (1.0 - y / self.height as f32))
                    as u32,
            ),
        );
        let left_angle = PI / 2.0 * ratio;

        if self.depth == depth && self.left_angle == left_angle {
            return;
        }

        self.depth = depth;
        self.left_angle = left_angle;
        self.right_angle = PI / 2.0 - left_angle;
        self.left_ratio = self.right_angle.sin();
        self.right_ratio = self.left_angle.sin();
    }

    pub fn depth(&self) -> u32 {
        self.depth
    }

    pub fn left_angle(&self) -> f32 {
        self.left_angle
    }

    pub fn right_angle(&self) -> f32 {
        self.right_angle
    }

    pub fn left_ratio(&self) -> f32 {
        self.left_ratio
    }

    pub fn right_ratio(&self) -> f32 {
        self.right_ratio
    }
}

fn max<T: PartialOrd>(a: T, b: T) -> T {
    if a < b {
        b
    } else {
        a
    }
}

fn min<T: PartialOrd>(a: T, b: T) -> T {
    if a > b {
        b
    } else {
        a
    }
}
