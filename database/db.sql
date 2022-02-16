CREATE TABLE IF NOT EXISTS tareas(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tareas (title, description) VALUES('Task1', 'Description1');

-----------------
--SPACES
--REALIZADO CON JSONB(PERMITE CREAR OBJETOS DENTRO DEL ARRAY Y TENER DIFERENTES TIPOS DE DATOS);
-- AQUI SE EXPLICA: https://levelup.gitconnected.com/working-with-a-jsonb-array-of-objects-in-postgresql-d2b7e7f4db87
CREATE TABLE IF NOT EXISTS spaces(
    listingID SERIAL PRIMARY KEY,
    listingName VARCHAR(100) NOT NULL,
    pricePerHour INTEGER NOT NULL,
    listingBusy JSONB
);
--Tendria que haber utilizado listing_name si no queda todo en minus

INSERT INTO spaces (listingName, pricePerHour, listingBusy) VALUES('Espacio 1', 50, '[{"startDateTime": "2022-02-15T08:00:00", "endDateTime": "2022-02-15T10:30:00", "status": "booked"}]');
INSERT INTO spaces (listingName, pricePerHour, listingBusy) VALUES('Espacio 2', 125, '[{"startDateTime": "2022-02-18T11:00:00", "endDateTime": "2022-02-18T12:00:00", "status": "blocked"}]');
INSERT INTO spaces (listingName, pricePerHour, listingBusy) VALUES('Espacio 3', 60, '[{"startDateTime": "2022-02-20T11:00:00", "endDateTime": "2022-02-20T12:00:00", "status": "booked"}]');

UPDATE spaces SET listingBusy = listingBusy || '{"startDateTime": "2022-02-10T08:00:00", "endDateTime": "2022-02-10T11:00:00", "status": "blocked"}' ::jsonb WHERE listingID = 3;

--BOOKINGS
CREATE TABLE IF NOT EXISTS bookings(
    bookingID SERIAL PRIMARY KEY,
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    totalPrice INTEGER NOT NULL,
    listingID INTEGER REFERENCES spaces (listingID)
);

INSERT INTO bookings (checkin, checkout, totalPrice, listingID) VALUES ('2022-02-15T08:00:00', '2022-02-15T10:30:00', 120, 1);

-- id de reserva, fecha de check in,
-- fecha de check out, precio total de la reserva, y 
-- la nueva ocupación del listing ?? Esto como lo rellenamos? Con el listingID?
