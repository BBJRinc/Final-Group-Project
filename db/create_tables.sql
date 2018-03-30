create table userInfo(
    userId serial primary key not null,
    givenName varchar(60),
    familyName varchar(60),
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email text,
    auth_id text
);

create table task(
    taskId serial primary key not null,
    taskName text not null,
    dueDate integer,
    startTime integer,
    description text,
    completed boolean DEFAULT false,
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updateAt integer,
    duration integer,
    color text DEFAULT '#ffffff',
    isRecurring boolean DEFAULT false,
    userId integer references userInfo(userId)
);

create table days(
    recurringDaysId serial primary key not null,
    sun boolean DEFAULT false,
    mon boolean DEFAULT false,
    tue boolean DEFAULT false,
    wed boolean DEFAULT false,
    thu boolean DEFAULT false,
    fri boolean DEFAULT false,
    sat boolean DEFAULT false,
    taskId integer references task(taskId)
);

create table checklistItem(
    checklistItemId serial primary key not null,
    content text,
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedAt integer,
    taskId integer references task(taskId),
    completed boolean DEFAULT false
);

create table comments(
    commentId serial primary key not null,
    content text,
    createdAt timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedAt integer,
    taskId integer references task(taskId),
    userId integer references userInfo(userId)
);