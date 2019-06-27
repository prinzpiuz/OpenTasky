const tasks = []
module.exports = class Task {
    constructor (task,user,ref) {
        this.task = task;
        this.user = user;
        this.reference = ref;
    }
    save () {
        tasks.push({user:this.user,task:this.task,reference:this.reference});
    }
    static getData () {
        return tasks;
    }

}