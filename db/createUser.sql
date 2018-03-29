insert into userinfo (givenname, familyname, email, auth_id)
values ($1, $2, $3, $4)
returning *;