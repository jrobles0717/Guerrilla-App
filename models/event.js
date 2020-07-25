class Event {
    constructor(id, title, description, date, time, name, image, address, lat, lng) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.name = name;
        this.image = image;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }
}

export default Event;