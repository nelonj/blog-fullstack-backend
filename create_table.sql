create table blog (
	id serial primary key,
	title varchar(250),
	article varchar(10000),
	date timestamp default current_timestamp(0) );

-- select*from blog;
-- insert into blog(title, article) values ('hello', 'this isn''t my essay');