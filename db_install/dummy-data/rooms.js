const rooms =[
    {
        room_id: 1,
        name: "Meeting Room #1",
        description: "Meeting Room #1",
        capacity: 10,
        assets: ['Projector', 'Monitor', 'Water']
    },
    {
        room_id: 2,
        name: "Meeting Room #2",
        description: "Meeting Room #2",
        capacity: 15,
        assets: ['Projector', 'Water']
    },
    {
        room_id: 3,
        name: "Meeting Room #3",
        description: "Meeting Room #3",
        capacity: 20,
        assets: ['Projector', 'Monitor']
    },
    {
        room_id: 4,
        name: "Meeting Room #4",
        description: "Meeting Room #4",
        capacity: 25,
        assets: ['Monitor', 'Water']
    }
]

module.exports = {
    rooms
}