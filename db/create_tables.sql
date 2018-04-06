create table userinfo(
    userid serial primary key not null,
    givenname varchar(60),
    familyname varchar(60),
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email text,
    auth_id text
);

create table task(
    taskid serial primary key not null,
    taskname text not null,
    duedate bigint,
    starttime bigint,
    description text,
    completed boolean DEFAULT false,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updateat integer,
    duration integer,
    color text DEFAULT '#838c91',
    isrecurring boolean DEFAULT false,
    userid integer references userinfo(userid)
);

create table days(
    recurringdaysid serial primary key not null,
    sun boolean DEFAULT false,
    mon boolean DEFAULT false,
    tue boolean DEFAULT false,
    wed boolean DEFAULT false,
    thu boolean DEFAULT false,
    fri boolean DEFAULT false,
    sat boolean DEFAULT false,
    taskid integer references task(taskid)
);

create table checklistitem(
    checklistitemid serial primary key not null,
    content text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat bigint,
    taskid integer references task(taskid),
    completed boolean DEFAULT false
);

create table comments(
    commentid serial primary key not null,
    content text,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat bigint,
    taskid integer references task(taskid),
    userid integer references userinfo(userid)
);