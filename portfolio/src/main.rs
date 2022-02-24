use std::{thread, time};

use portfolio::*;

fn main() {
    let mut universe = Universe::new(256, 1024);
    let sleep_time = time::Duration::from_millis(100);

    for _ in 0..100 {
        universe.tick();
        println!("{}", universe.render());
        println!("\n\n\n");
        // thread::sleep(sleep_time);
    }
}
