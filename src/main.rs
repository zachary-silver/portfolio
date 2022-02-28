use portfolio::game_of_life::Universe;

fn main() {
    let mut universe = Universe::new(32, 64);

    loop {
        universe.tick();
    }
}
