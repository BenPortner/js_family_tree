data = {
    // example data provided by JackVed (https://github.com/BenPortner/js_family_tree/issues/2)
    "start": "id4",
    "persons": {
        "id2": {
            "id": "id2",
            "own_unions": ["u2"],
            "parent_union": "u1",
            "name": "item01",
            "birthyear": 1900,
            "deathyear": 1980
        },
        "id1": {
            "id": "id1",
            "own_unions": ["u1"],
            "name": "item00",
            "birthyear": 1901,
            "deathyear": 1985
        },
        "id4": {
            "id": "id4",
            "own_unions": ["u4"],
            "parent_union": "u3",
            "name": "item02",
            "birthyear": 1926,
            "deathyear": 2009
        },
        "id3": {
            "id": "id3",
            "own_unions": ["u3"],
            "parent_union": "u2",
            "name": "topic00",
            "birthyear": 1902,
            "deathyear": 1970
        },
        "id6": {
            "id": "id6",
            "own_unions": [],
            "parent_union": "u4",
            "name": "item04",
            "birthyear": 1931,
            "deathyear": 2015
        },
        "id5": {
            "id": "id5",
            "own_unions": ["u4"],
            "parent_union": "u3",
            "name": "item03",
            "birthyear": 1930,
            "deathyear": 2010
        }
    },
    "unions": {
        "u1": {
            "id": "u1",
            "partner": ["id1"],
            "children": ["id2"]
        },
        "u2": {
            "id": "u2",
            "partner": ["id2"],
            "children": ["id3"]
        },
        "u3": {
            "id": "u3",
            "partner": ["id3"],
            "children": ["id4", "id5"]
        },
        "u4": {
            "id": "u4",
            "partner": ["id4", "id5"],
            "children": ["id6"]
        }
    },
    "links": [
        ["id1", "u1"],
        ["u1", "id2"],
        ["id2", "u2"],
        ["u2", "id3"],
        ["id3", "u3"],
        ["u3", "id4"],
        ["u3", "id5"],
        ["id4", "u4"],
        ["id5", "u4"],
        ["u4", "id6"]
    ]
}