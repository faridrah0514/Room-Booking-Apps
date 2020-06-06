const rooms =[
    {
        room_id: 1,
        name: "meeting room #1",
        description: "meeting room #1",
        capacity: 10,
        assets: ['Projector', 'Monitor', 'Water']
    },
    {
        room_id: 2,
        name: "meeting room #2",
        description: "meeting room #2",
        capacity: 15,
        assets: ['Projector', 'Water']
    },
    {
        room_id: 3,
        name: "meeting room #3",
        description: "meeting room #3",
        capacity: 20,
        assets: ['Projector', 'Monitor']
    },
    {
        room_id: 4,
        name: "meeting room #4",
        description: "meeting room #4",
        capacity: 25,
        assets: ['Monitor', 'Water']
    }
]

module.exports = {
    rooms
}