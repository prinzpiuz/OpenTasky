const tasks = []

const fs = require('fs');
const path = require('path');
const uuidV4 = require('uuid/v4');

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
        this.id = uuidV4();
        this.task = task;
        this.user = user;
        this.reference = ref;
    }
    save () {
        getFileData(tasks =>{
            if (this.id) {
                taskIndex = tasks.findIndex(id => id.id == this.id);
                updateTask = [...tasks];
                updateTask[taskIndex] = this;
                fs.writeFile(p, JSON.stringify(tasks), err => {
                    console.log(err);
                });
            }
            else {
            tasks.push({ id:this.id, user: this.user, task: this.task, reference: this.reference });
            fs.writeFile(p, JSON.stringify(tasks), err => {
                console.log(err);
            });
        }
        });
    }
    static getData (cb) {
        getFileData(cb);
    }

    static findTask (val, cb) {
        getFileData(tasks => {
            cb(tasks.find(id => id.id === val ));
        });
    }

    static deleteTask (val, cb) {
        getFileData(tasks => {
        const task = tasks.find(id => id.id === val);
        const updatedList = tasks.filter(id => id.id !== val);
        fs.writeFile(p, JSON.stringify(updatedList), err => {
            console.error(err);
        });
        });
    }

}