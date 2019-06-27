const tasks = []

const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getFileData = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Task {
    constructor (task,user,ref) {
        this.task = task;
        this.user = user;
        this.reference = ref;
    }
    save () {
        getFileData(tasks =>{
            tasks.push({ user: this.user, task: this.task, reference: this.reference });
            fs.writeFile(p, JSON.stringify(tasks), err => {
                console.log(err);
            });
        });

    }
    static getData (cb) {
        getFileData(cb);
    }

}