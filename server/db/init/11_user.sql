ALTER DATABASE "shift-db" OWNER TO root;

\connect -reuse-previous=on "dbname='shift-db'"

BEGIN;
INSERT INTO public."Staff"(name, employment_status, shift_type, is_deleted, updated_at, created_at)
VALUES (
        '山田太郎',
        '正社員',
        '1,2,3',
        FALSE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );
INSERT INTO public."Staff"(name, employment_status, shift_type, is_deleted, updated_at, created_at)
VALUES (
        '清水龍太',
        '正社員',
        '1,2',
        FALSE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );
INSERT INTO public."Holiday"(id, title, holiday, updated_at, created_at)
VALUES (
        '01F89GSJTSES6WS6BV6VQBTEMY',
        '休園日',
        '2021-06-28',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );
INSERT INTO public."Holiday"(id, title, holiday, updated_at, created_at)
VALUES (
        '01F89GWJ5BC5QSDKXTNG8ZTQ7R',
        '休園日',
        '2021-06-29',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );
INSERT INTO public."HopeHoliday"(staff_id, hope_holiday,staff_hope_holiday , updated_at, created_at)
VALUES (
        1,
        '2022-05-20',
        '1_2022-05-20',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

INSERT INTO public."ShiftType"(name, start_time, end_time, updated_at, created_at)
VALUES (
        '早番',
        '9:00',
        '16:00',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

INSERT INTO public."ShiftType"(name, start_time, end_time, updated_at, created_at)
VALUES (
        '通常番',
        '8:30',
        '17:30',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

INSERT INTO public."ShiftType"(name, start_time, end_time, updated_at, created_at)
VALUES (
        '遅番',
        '11:00',
        '20:10',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

INSERT INTO public."EmploymentStatus"(name, updated_at, created_at)
VALUES (
        '正社員',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

INSERT INTO public."EmploymentStatus"(name, updated_at, created_at)
VALUES (
        'パート',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );
    
INSERT INTO public."RequiredNumberOfPeople"(work_date,number_of_people, updated_at, created_at)
VALUES (
        '2022-07-01',
        '{"sumCount": 5, "numberOfPeople": [{"status": "1", "count": 2}, {"status": "2", "count": 3}]}',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

INSERT INTO public."RequiredNumberOfPeople"(work_date,number_of_people, updated_at, created_at)
VALUES (
        '2022-07-02',
        '{"sumCount": 5, "numberOfPeople": [{"status": "1", "count": 3}, {"status": "2", "count": 5}]}',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

COMMIT
