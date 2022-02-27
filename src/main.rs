use portfolio::*;

fn main() {
    let mut universe = Universe::new(32, 64);

    loop {
        universe.tick();
    }
}
