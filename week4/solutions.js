import R from 'ramda'
import Maybe from '../week1/maybe'

// Task1
// "function" to "Function"
// method 1
const inputTask1 = 'function';
const capitalize1 = R.compose(
    R.join(''),
    R.juxt([R.compose(R.toUpper, R.head), R.tail])
);
// console.log(capitalize1(inputTask1));

// method 2
const capitalize2 = R.converge(R.concat, [R.compose(R.toUpper, R.head), R.tail]);
// console.log(capitalize2(inputTask1));


// Task2
// [{id: 1, score: 90}, {id: 2, score: 40}, {id: 3, score: 80}]
// to [{id: 1, score: 90}, {id: 2, score: 50}, {id: 3, score: 80}]
// given id needs to be matched with 2 and score needs to be increased by 10
const inputTask2 = [{id: 1, score: 90}, {id: 2, score: 40}, {id: 3, score: 80}];
const findId2ScoreAdd10 = arr => R.adjust(
    R.evolve({score: R.add(10)}),
    R.findIndex(R.propEq('id', 2))(arr)
)(arr);
// console.log(findId2ScoreAdd10(inputTask2));


// Task3
// [1, 2, 3] to [<div key={0}>1</div>, <div key={1}>2</div>, <div key={2}>3</div>]
const inputTask3 = [1, 2, 3];
const mapIndexed = R.addIndex(R.map);
const arrToHtmlArr = mapIndexed((val, idx) => '<div key={' + idx + '}>' + val + '</div>');
// console.log(arrToHtmlArr(inputTask3));


// Task4
// {name: "John", age: 20} to [<div key="name">John</div>, <div key="age">20</div>]
const inputTask4 = {name: "John", age: 20};
const objToHtmlArr = R.compose(
    R.values,
    R.mapObjIndexed((val, key) => '<div key="' + key + '">' + val + '</div>')
);
// console.log(objToHtmlArr(inputTask4));


// Task5
// [{id: 1}, {id: 2}, {id: 3}]
// to Just({id: 2})
const inputTask5 = [{id: 1}, {id: 2}, {id: 3}];
const toJust = R.compose(
    a => a.toString(),
    Maybe.fromNullable,
    R.find(R.propEq('id', 2))
);
// console.log(toJust(inputTask5));


// Task6
// given:
//
const tasks = [{
    "id": 6441,
    "name": "Teach me how to fly a drone",
    "slug": "drone"
}]
//
const activities = [{taskId: 6441}, {taskId: 289}]
//
// produce:
// [Just({"id": 6441, "name": "Teach me how to fly a drone", "slug": "drone"}), Nothing]

const func = task => R.compose(
    Maybe.fromNullable,
    R.find(R.propEq('id', task.taskId))
)(tasks);
const mapMaybeAct = R.map(
    R.compose(
        a => a.toString(),
        func
    )
);
// console.log(mapMaybeAct(activities));


// Task7
// given:
const payload = {payloadString: '20'}
const scores = [{score: 10}, {score: 15}]
// produce:
// [{score: 20}, {score: 10}, {score: 15}]
const prependObjToArr = R.compose(
    R.prepend(R.__, scores),
    // R.insert(0, R.__, scores),//either one works
    R.objOf('score'),
    a => +a
);
// console.log(prependObjToArr(payload.payloadString));


// const task7_payload = {payloadString: "20"};
// const task7_scores = [{score: 10}, {score: 15}];
// console.log(R.compose(
//     R.prepend(R.__, task7_scores),
//     R.objOf("score"),
//     a => +a
// )(task7_payload.payloadString));

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
