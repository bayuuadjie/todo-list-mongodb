const fs = require('fs')

const loadActivity = () => {
    const json = fs.readFileSync('data/activity.JSON', 'utf-8')
    return JSON.parse(json)
};

const saveActivity = (data) => {
    fs.writeFileSync('data/activity.JSON', JSON.stringify(data))
}

const deleteActivity = (data) => {
    const activities = loadActivity();
    const filteredActivities = activities.filter(activity => activity.activity != data);
    saveActivity(filteredActivities);
}

const updateActivity = (data) => {
    const activities = loadActivity();
    const targetActivity = activities.find(activity => activity.activity == data);
    if (targetActivity.status == 'done') {
        targetActivity.status = 'progress';
    } else {
        targetActivity.status = 'done';
    }
    saveActivity(activities);
}

const addActivity = (data) => {
    const activities = loadActivity();
    activities.push({...data, status: 'progress'});
    saveActivity(activities);
}

module.exports = { addActivity, loadActivity, deleteActivity, updateActivity, saveActivity }