/// [badExample]
const bestMovies = {
    '1980s': [
        { name: 'Blade Runner', director: 'Ridley Scott' },
        { name: 'The Shining', director: 'Stanley Kubrick' },
        { name: 'Ghostbusters', director: 'Ivan Reitman' }
    ],
    '1990s': [
        { name: 'Men In Black', director: 'Barry Sonnenfeld' },
        { name: 'Schindler\'s List', director: 'Steven Spielberg' },
        { name: 'Mission: Impossible', director: 'Brian De Palme' }
    ],
    '2000s': [
        { name: 'The Dark Knight', director: 'Christopher Nolan' },
        { name: 'Gladiator', director: 'Ridley Scott' },
        { name: 'The Lord of the Rings: The Fellowship of the Ring', director: 'Peter Jackson' }
    ]
}

// TypeError: {} is not iterable
for(const movie of bestMovies) {
    console.log(movie);
}
/// [badExample]

/// [iterableExample]
const bestMovies = {
    '1980s': [
        { name: 'Blade Runner', director: 'Ridley Scott' },
        { name: 'The Shining', director: 'Stanley Kubrick' },
        { name: 'Ghostbusters', director: 'Ivan Reitman' }
    ],
    '1990s': [
        { name: 'Men In Black', director: 'Barry Sonnenfeld' },
        { name: 'Schindler\'s List', director: 'Steven Spielberg' },
        { name: 'Mission: Impossible', director: 'Brian De Palme' }
    ],
    '2000s': [
        { name: 'The Dark Knight', director: 'Christopher Nolan' },
        { name: 'Gladiator', director: 'Ridley Scott' },
        { name: 'The Lord of the Rings: The Fellowship of the Ring', director: 'Peter Jackson' }
    ],
    [Symbol.iterator]() {
        const years = Object.values(this);
        
        let currentYearIndex = 0;
        let currentMovieIndex = 0;

        return {
            next() {
                const movies = years[currentYearIndex];
                
                const outOfMovies = !(currentMovieIndex < movies.length);

                if(outOfMovies) {
                    currentYearIndex++;
                    currentMovieIndex = 0;
                }

                const outOfYears = !(currentYearIndex < years.length);
                if(outOfYears) {
                    return { value: undefined, done: true };
                }

                return {
                    value: years[currentYearIndex][currentMovieIndex++],
                    done: false
                };
            }
        };
    }
    
};
for(const movie of bestMovies) console.log(movie);

console.log(...bestMovies);
/// [iterableExample]

