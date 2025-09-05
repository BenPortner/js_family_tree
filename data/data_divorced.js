data = {
    "start": "p2",
    "persons": {
        "p1": {"name": "p1"},
        "p2": {"name": "p2"},
        "p3": {"name": "p3"},
        "p4": {"name": "p4"},
        "p5": {"name": "p5"}
    },
    "unions": {
        "u1": {"status": "divorced"},
        "u2": {"status": "married"}
    },
    "links": [
        ["p1", "u1"],
        ["p2", "u1"],
        ["u1", "p3"],
        ["p4", "u2"],
        ["p2", "u2"],
        ["u2", "p5"]
    ]
}