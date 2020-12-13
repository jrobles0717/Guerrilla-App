import { openDatabase } from 'expo-sqlite';

const db = openDatabase('events.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL, name TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
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

export const updatesEvent = (id, name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(`UPDATE events SET name=? WHERE id = ?`,
            [id, name],
            (_, result) => {
                console.log('Results', result.rowsAffected);
                if (result.rowsAffected > 0) {
                    Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                        {
                        text: 'Ok'
                        }
                    ],
                    { cancelable: false }
                    );
                } else alert('Updation Failed');
                
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