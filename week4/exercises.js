// "function" to "Function"


// [{id: 1, score: 90}, {id: 2, score: 40}, {id: 3, score: 80}]
// to [{id: 1, score: 90}, {id: 2, score: 50}, {id: 3, score: 80}]
// given id needs to be matched with 2 and score needs to be increased by 10


// [1, 2, 3] to [<div key={0}>1</div>, <div key={1}>2</div>, <div key={2}>3</div>]


// {name: "John", age: 20} to [<div key="name">John</div>, <div key="age">20</div>]


// [{id: 1}, {id: 2}, {id: 3}]
// to Just({id: 2})


// given:
//
// const tasks = {
//   "tasks": [{
//     "id": 6441,
//     "name": "Teach me how to fly a drone",
//     "slug": "drone"
//   }]
// }
//
// const activities = [{taskId: 6441}, {taskId: 289}]
//
// produce:
// [Just({"id": 6441, "name": "Teach me how to fly a drone", "slug": "drone"}), Nothing]


// given:
// const payload = {payloadString: '20'}
// const scores = [{score: 10}, {score: 15}]
// produce:
// [{score: 20}, {score: 10}, {score: 15}]


// given:
// const n = 2
// produce:
// [{score: 2}, {score: 1}]


// {noise: '/factory/1/noise', temperature: '/factory/1/temperature'}
// to {'/factory/1/noise': [], '/factory/1/temperature': []}


// given:
//
// {showDialog: false, buttonDisabled: false, slides: []}
// {showDialog: true, buttonDisabled: true, slides: [{id: 1, name: 'programming'}]}
//
// produce:
// {showDialog: false, buttonDisabled: false, slides: [{id: 1, name: 'programming'}]}


// {connecting: true, connected: false}
// to {connecting: false, connected: true}


// given:
// const sensorNames = ['noise', 'temperature']
// const sensorValues = [20, 30]
// const airQualitySensorData = {airQuality: 40}
// produce:
// {noise: 20, temperature: 30, airQuality: 40}


// [{qa: true}, {qa: null}, {qa: true}, {qa: null}]
// to [{qa: true}, {qa: true}, {qa: true}, {qa: null}]


// given:
// const ts = [{temperature: 32}, {temperature: 50}, {temperature: 113}]
// const cof = [
//   1.8
// ]
// const rate = cof =>
//   compose(
//     divide(__, cof),
//     subtract(__, 32),
//     prop('temperature')
//   )
//
// produce:
// [0, 10, 45]


// [1, null, undefined, '', [], 2]
// to [1, 2]
