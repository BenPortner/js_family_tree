data = {
    "start":"id4",
    "persons": {
        "id1": { "name": "Adam", "birthyear": 1900, "deathyear": 1980, "birthplace":"Alberta", "deathplace":"Austin"},
        "id2": { "name": "Berta", "birthyear": 1901, "deathyear": 1985, "birthplace":"Berlin", "deathplace":"Bern" },
        "id3": { "name": "Charlene", "birthyear": 1930, "deathyear": 2010, "birthplace":"Château", "deathplace":"Cuxhaven" },
        "id4": { "name": "Dan", "birthyear": 1926, "deathyear": 2009, "birthplace":"den Haag", "deathplace":"Derince" },
        "id5": { "name": "Eric", "birthyear": 1931, "deathyear": 2015, "birthplace":"Essen", "deathplace":"Edinburgh" },
        "id6": { "name": "Francis", "birthyear": 1902, "deathyear": 1970, "birthplace":"Firenze", "deathplace":"Faizabad" },
        "id7": { "name": "Greta", "birthyear": 1905, "deathyear": 1990 },
        "id8": { "name": "Heinz", "birthyear": 1970 },
        "id9": { "name": "Iver", "birthyear": 1925, "deathyear": 1963 },
        "id10": { "name": "Jennifer", "birthyear": 1950 },
        "id11": { "name": "Klaus", "birthyear": 1933, "deathyear": 2013 },
        "id12": { "name": "Lennart", "birthyear": 1999 }
    },
    "unions": {
        "u1": { },
        "u2": { },
        "u3": { },
        "u4": { },
        "u5": { }
    },
    "links": [
        ["id1", "u1"],
        ["id2", "u1"],
        ["u1", "id3"],
        ["u1", "id4"],
        ["id6", "u2"],
        ["id7", "u2"],
        ["u2", "id5"],
        ["id3", "u3"],
        ["id5", "u3"],
        ["u3", "id8"],
        ["id3", "u4"],
        ["id9", "u4"],
        ["u4", "id10"],
        ["u1", "id11"],
        ["id8", "u5"],
        ["u5", "id12"]
    ]
}