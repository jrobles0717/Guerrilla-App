import { openDatabase } from 'expo-sqlite';

const db = openDatabase('events.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, name TEXT, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const insertEvent = (title, description, date, time, name, image, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`INSERT INTO events (title, description, date, time, name, image, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description, date, time, name, image, address, lat, lng],
            (_, result) => {
                if (result.rowsAffected > 0 ) {
                    console.log("Create new event successfully!!");
                }
                else {
                    console.log("Create new event failed!!");
                }
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const removeEvent = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`DELETE FROM events WHERE id = ? `,
            [id],
            (_, result) => {
                if (result.rowsAffected > 0 ) {
                    console.log(`Delete id=${id} event successfully!!`);
                }
                else {
                    console.log(`Delete id=${id} event failed!!`);
                }
                //console.log('The result fo deleteEvent (DELETE TABLE)', result);
                resolve(result);
            },
            (_, err) => {
                console.log('this error from deleteEvent promise', err);
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const searchIdEvent = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM events WHERE id = ?`,
            [id],
            (_, result) => {
                const len = result.rows.length;
                console.log("Events in database length: " + len);
                if (len > 0) {
                    let res = result.rows.item(0);
                    console.log("Event was found :" + res);
                    // updateAllStates(
                    // res.user_name,
                    // res.user_contact,
                    // res.user_address
                    // );
                } else {
                    alert('No event found');
                    // updateAllStates('', '', '');
                }
                
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const updatesEvent = (id, name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`UPDATE events SET name = ?`,
            [name, id],
            (_, result) => {
                console.log('Results', result);
                console.log('Results rowsAffected', result.rowsAffected);
                if (result.rowsAffected > 0) {
                    alert(
                    'Success',
                    'User updated successfully',
                    [
                        {
                        text: 'Ok'
                        }
                    ],
                    { cancelable: false }
                    );
                    console.log(`Update id=${id} name=${name} event successfully!!`);
                } else {
                    alert('Updation Failed');
                    console.log(`Update id=${id} name=${name} event failed!!`);
                }
                
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const fetchEvents = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM events',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchIdEvents = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM events WHERE id = ?',
                [id],
                (_, result) => {
                    console.log("Event selected by the fetchIdEvents: " + JSON.stringify(result.rows._array));
                    // if (JSON.stringify(result.rows._array.id) === id) {
                    //     console.log("inside if statement in fetchIdEvents: ");
                    // }
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

// export const updateEvents = () => {
//     const promise = new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 'SELECT * FROM events',
//                 [],
//                 (_, result) => {
//                     resolve(result);
//                 },
//                 (_, err) => {
//                     reject(err);
//                 }
//             );
//         });
//     });
//     return promise;
// };