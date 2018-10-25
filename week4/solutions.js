import * as R from "ramda";
import Maybe from "../week1/maybe";
/* #########################################################################
  Task1:
    Input: "function"
    Output: "Function"
############################################################################ */
R.compose(
  R.converge(R.concat, [
    R.compose(
      R.toUpper,
      R.head
    ),
    R.tail
  ])
)("function");
/* #########################################################################
 Task2:
    Input: [{id: 1, score: 90}, {id: 2, score: 40}, {id: 3, score: 80}]
    Output: [{id: 1, score: 90}, {id: 2, score: 50}, {id: 3, score: 80}]
    given id needs to be matched with 2 and score needs to be increased by 10
############################################################################ */
const task2_data = [
  { id: 1, score: 90 },
  { id: 2, score: 40 },
  { id: 3, score: 80 }
];
R.adjust(
  R.evolve({
    score: R.add(10)
  }),
  R.findIndex(R.propEq("id", 2))(task2_data)
)(task2_data);

/* #########################################################################
 Task3:
     input: [1, 2, 3]
     output: [<div key={0}>1</div>, <div key={1}>2</div>, <div key={2}>3</div>]
############################################################################ */
var mapIndexed = R.addIndex(R.map);
mapIndexed((val, idx) => "<div key=" + idx + ">" + idx + "</div>", [1, 2, 3]);

/* #########################################################################
 Task4:
     inpput: {name: "John", age: 20}
     output: [<div key="name">John</div>, <div key="age">20</div>]
############################################################################ */
var transforma = (num, key, obj) => "<div key=" + "key" + ">" + num + "</div>";
R.compose(
  R.values,
  R.mapObjIndexed(transforma)
)({ name: "John", age: 20 });

/* #########################################################################
 Task5:
    input: [{id: 1}, {id: 2}, {id: 3}]
    output: to Just({id: 2})
############################################################################ */
const task5_data = [{ id: 1 }, { id: 2 }, { id: 3 }];
R.compose(
  Maybe.fromNullable,
  R.find(R.propEq("id", 2))
)(task5_data);

/* #########################################################################
 Task6:
    input:
      const tasks = {
        "tasks": [{
          "id": 6441,
          "name": "Teach me how to fly a drone",
          "slug": "drone"
        }]
      }
      const activities = [{taskId: 6441}, {taskId: 289}]
    output:
      [Just({"id": 6441, "name": "Teach me how to fly a drone", "slug": "drone"}), Nothing]
############################################################################ */
const task6_tasks = {
  tasks: [
    {
      id: 6441,
      name: "Teach me how to fly a drone",
      slug: "drone"
    }
  ]
};
const activities = [{ taskId: 6441 }, { taskId: 289 }];

const findBytaskId = data => id =>
  R.compose(
    Maybe.fromNullable,
    R.find(R.propEq("id", id))
  )(data);

R.map(
  R.compose(
    findBytaskId(task6_tasks.tasks),
    R.prop("taskId")
  )
)(activities);

/* #########################################################################
 Task7:
      input:
         const payload = {payloadString: '20'}
         const scores = [{score: 10}, {score: 15}]
      output:
        [{score: 20}, {score: 10}, {score: 15}]
############################################################################ */
const task7_payload = { payloadString: "20" };
const task7_scores = [{ score: 10 }, { score: 15 }];
R.compose(
  R.prepend(R.__, task7_scores),
  R.objOf("score"),
  score => +score
)(task7_payload.payloadString);

/* #########################################################################
 Task 8 :
      input: const n = 2
      output: [{score: 2}, {score: 1}]
############################################################################ */
const f = n => (n <= 0 ? false : [R.objOf("score")(n), n - 1]);
R.unfold(f, 2);

/* #########################################################################
 Task 9:
      input: {noise: '/factory/1/noise', temperature: '/factory/1/temperature'}
      output: {'/factory/1/noise': [], '/factory/1/temperature': []}
############################################################################ */

R.zipObj(R.values(input), R.repeat([], 2));

// {noise: '/factory/1/noise', temperature: '/factory/1/temperature'}
// to {'/factory/1/noise': [], '/factory/1/temperature': []}

/* #########################################################################
 Task 10:
   input:
   {showDialog: false, buttonDisabled: false, slides: []}
   {showDialog: true, buttonDisabled: true, slides: [{id: 1, name: 'programming'}]}

   output:
   {showDialog: false, buttonDisabled: false, slides: [{id: 1, name: 'programming'}]}
############################################################################ */
// skip

/* #########################################################################
 Task 11:
   input: {connecting: true, connected: false}
   output: {connecting: false, connected: true}
############################################################################ */

R.evolve({
  connecting: R.not,
  connected: R.not
})(input);

/* #########################################################################
 Task 12:
  input:
  const sensorNames = ['noise', 'temperature']
  const sensorValues = [20, 30]
  const airQualitySensorData = {airQuality: 40}

  output:
  {noise: 20, temperature: 30, airQuality: 40}

############################################################################ */
R.compose(
  R.merge(R.__, airQualitySensorData),
  R.zipObj(sensorNames)
)(sensorValues);

/* #########################################################################
 Task 13:

   input:
    [{qa: true}, {qa: null}, {qa: true}, {qa: null}]
   output:
    [{qa: true}, {qa: true}, {qa: true}, {qa: null}
############################################################################ */
R.ap(R.flip(R.adjust(R.assoc("qa", true))), R.findIndex(R.propEq("qa", null)))(
  input
);

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

/* #########################################################################
  Task 14:
  input: R.reject(R.either(R.isNil, R.isEmpty)(input)
  output: [1,2]
############################################################################ */
R.reject(R.either(R.isNil, R.isEmpty))(input);
