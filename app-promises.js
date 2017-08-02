const users = [{
    id: 1,
    name: 'Andrew',
    schoolId: 101
}, {
    id: 2,
    name: 'Jessica',
    schoolId: 999
}];
const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
},
{
    id: 2,
    schoolId: 999,
    grade: 100
},
{
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return id === user.id;
        });

        if (user) {
            resolve(user);
        } else {
            reject('unabel to find user with id of ' + id);

        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => { return grade.schoolId === schoolId; }));
    });
};



const getStatus = (userId) => {
    let user;

    return getUser(userId).then(tempUser => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        console.log(grades);
        if (grades.length > 0) {

            for (let i = 0; i < grades.length; i++) {
                average = average + grades[i].grade;
                console.log(average);
            }


            return average / grades.length;


        } else {
            return 0;
        }

    });

};

// async await

/* () => {
    return new new Promise((resolve, reject) => {
        resolve('Mike');

    });
};
 */

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);

    let average = 0;
    console.log(grades);
    if (grades.length > 0) {

        for (let i = 0; i < grades.length; i++) {
            average = average + grades[i].grade;
            console.log(average);
        }


        return average / grades.length;


    } else {
        return 0;
    }


};

getStatusAlt(1).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log('error:', e);
});

/* getStatus(1).then((state) => {
    console.log(state);
}).catch((e) => {
    console.log(e);
}); */