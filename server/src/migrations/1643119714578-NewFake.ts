import { MigrationInterface, QueryRunner } from "typeorm";

export class NewFake1643119714578 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        
        
        
        insert into post (id, title, text, url, "creatorId", "createdAt") values (1, 'Keeling-Roob', 6, 'http://dummyimage.com/182x100.png/5fa2dd/ffffff', 6, '2021-08-17T13:41:31Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (2, 'Beatty, Kuhlman and Reichert', 2, 'http://dummyimage.com/203x100.png/cc0000/ffffff', 6, '2022-01-23T05:00:01Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (3, 'Hoeger-Jones', 1, 'http://dummyimage.com/116x100.png/cc0000/ffffff', 6, '2021-04-03T08:19:46Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (4, 'Gleichner and Sons', 1, 'http://dummyimage.com/110x100.png/cc0000/ffffff', 6, '2021-05-23T19:51:08Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (5, 'Crona, Will and Beer', 2, 'http://dummyimage.com/150x100.png/cc0000/ffffff', 6, '2021-07-21T17:14:46Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (6, 'Schmitt and Sons', 1, 'http://dummyimage.com/131x100.png/ff4444/ffffff', 6, '2021-05-12T18:46:09Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (7, 'Abbott, Streich and West', 1, 'http://dummyimage.com/188x100.png/ff4444/ffffff', 6, '2021-02-21T08:27:29Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (8, 'Zulauf-Hauck', 2, 'http://dummyimage.com/150x100.png/cc0000/ffffff', 6, '2021-12-24T16:19:46Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (9, 'Howe Inc', 3, 'http://dummyimage.com/250x100.png/ff4444/ffffff', 6, '2021-11-23T00:13:11Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (10, 'Leffler, Schmidt and Bauch', 1, 'http://dummyimage.com/193x100.png/ff4444/ffffff', 6, '2021-09-18T16:36:46Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (11, 'Wunsch Inc', 2, 'http://dummyimage.com/249x100.png/dddddd/000000', 6, '2022-01-17T18:37:55Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (12, 'Hyatt, Swift and Nikolaus', 1, 'http://dummyimage.com/188x100.png/dddddd/000000', 6, '2022-01-07T23:00:28Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (13, 'Morar, Bruen and Gaylord', 1, 'http://dummyimage.com/216x100.png/dddddd/000000', 6, '2021-07-03T00:28:30Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (14, 'Thompson, Ortiz and Graham', 1, 'http://dummyimage.com/228x100.png/cc0000/ffffff', 6, '2021-02-05T18:02:17Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (15, 'Willms-King', 3, 'http://dummyimage.com/114x100.png/ff4444/ffffff', 6, '2021-09-12T08:04:35Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (16, 'Hilll-Zemlak', 2, 'http://dummyimage.com/173x100.png/ff4444/ffffff', 6, '2021-04-11T19:13:20Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (17, 'Lehner-Johnson', 1, 'http://dummyimage.com/138x100.png/dddddd/000000', 6, '2021-03-28T13:06:22Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (18, 'Farrell, Mohr and Swaniawski', 1, 'http://dummyimage.com/185x100.png/ff4444/ffffff', 6, '2021-04-08T04:29:15Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (19, 'Cole-Quitzon', 3, 'http://dummyimage.com/212x100.png/dddddd/000000', 6, '2021-05-31T00:40:31Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (20, 'Kilback, Larkin and Goodwin', 2, 'http://dummyimage.com/101x100.png/cc0000/ffffff', 6, '2021-05-21T05:54:39Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (21, 'Waters, Kunze and Von', 2, 'http://dummyimage.com/106x100.png/dddddd/000000', 6, '2021-07-22T02:10:52Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (22, 'Thiel and Sons', 1, 'http://dummyimage.com/140x100.png/dddddd/000000', 6, '2021-06-01T14:40:02Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (23, 'Purdy, Feeney and Borer', 2, 'http://dummyimage.com/205x100.png/cc0000/ffffff', 6, '2021-03-06T16:25:14Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (24, 'Harvey, Dickinson and Mohr', 2, 'http://dummyimage.com/160x100.png/dddddd/000000', 6, '2021-08-06T05:33:33Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (25, 'Hoeger-Runolfsson', 2, 'http://dummyimage.com/236x100.png/cc0000/ffffff', 6, '2021-08-24T21:12:33Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (26, 'Stoltenberg-Senger', 1, 'http://dummyimage.com/149x100.png/dddddd/000000', 6, '2021-06-02T16:50:54Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (27, 'Roob-Gerlach', 1, 'http://dummyimage.com/186x100.png/ff4444/ffffff', 6, '2021-09-05T08:01:01Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (28, 'Fritsch, Dach and Baumbach', 3, 'http://dummyimage.com/220x100.png/cc0000/ffffff', 6, '2021-09-02T02:20:07Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (29, 'Labadie, Lakin and Bernhard', 2, 'http://dummyimage.com/107x100.png/dddddd/000000', 6, '2021-01-03T01:51:39Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (30, 'Senger Group', 2, 'http://dummyimage.com/170x100.png/5fa2dd/ffffff', 6, '2021-05-22T18:55:27Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (31, 'Emmerich-Klocko', 3, 'http://dummyimage.com/249x100.png/cc0000/ffffff', 6, '2021-11-02T01:21:13Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (32, 'Bayer Inc', 4, 'http://dummyimage.com/171x100.png/5fa2dd/ffffff', 6, '2021-08-15T19:26:49Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (33, 'Kris-Kulas', 2, 'http://dummyimage.com/146x100.png/ff4444/ffffff', 6, '2021-03-04T22:45:51Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (34, 'Johnston-Kuhic', 1, 'http://dummyimage.com/102x100.png/dddddd/000000', 6, '2021-04-21T08:26:50Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (35, 'Reichel, Kuhn and Rohan', 4, 'http://dummyimage.com/147x100.png/5fa2dd/ffffff', 6, '2021-03-24T15:37:23Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (36, 'Kunze-Nolan', 4, 'http://dummyimage.com/228x100.png/dddddd/000000', 6, '2021-08-21T05:12:05Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (37, 'Kilback Inc', 1, 'http://dummyimage.com/161x100.png/dddddd/000000', 6, '2021-10-31T01:02:25Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (38, 'Daugherty, Welch and Mraz', 1, 'http://dummyimage.com/164x100.png/ff4444/ffffff', 6, '2021-09-04T14:03:40Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (39, 'Zieme-Dietrich', 1, 'http://dummyimage.com/180x100.png/cc0000/ffffff', 6, '2021-01-21T16:09:12Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (40, 'Muller, Gleichner and Cormier', 2, 'http://dummyimage.com/156x100.png/ff4444/ffffff', 6, '2021-03-13T20:42:32Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (41, 'Mills, Kutch and Langworth', 3, 'http://dummyimage.com/230x100.png/cc0000/ffffff', 6, '2021-06-25T16:36:33Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (42, 'Kautzer-Buckridge', 3, 'http://dummyimage.com/224x100.png/dddddd/000000', 6, '2021-10-21T05:20:47Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (43, 'Brakus-Krajcik', 2, 'http://dummyimage.com/216x100.png/ff4444/ffffff', 6, '2021-01-16T20:47:19Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (44, 'Bergstrom-Macejkovic', 1, 'http://dummyimage.com/128x100.png/5fa2dd/ffffff', 6, '2021-10-12T02:28:42Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (45, 'Turner-Halvorson', 1, 'http://dummyimage.com/212x100.png/ff4444/ffffff', 6, '2021-05-03T18:58:18Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (46, 'Johnston-Powlowski', 1, 'http://dummyimage.com/101x100.png/ff4444/ffffff', 6, '2021-01-21T18:32:46Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (47, 'Rowe-Huels', 2, 'http://dummyimage.com/122x100.png/cc0000/ffffff', 6, '2021-09-15T03:29:49Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (48, 'Lubowitz, Mraz and Huels', 1, 'http://dummyimage.com/208x100.png/cc0000/ffffff', 6, '2021-04-20T16:38:28Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (49, 'Paucek LLC', 2, 'http://dummyimage.com/232x100.png/5fa2dd/ffffff', 6, '2021-01-27T04:21:02Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (50, 'Farrell, Padberg and Gerhold', 3, 'http://dummyimage.com/133x100.png/ff4444/ffffff', 6, '2022-01-08T07:51:21Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (51, 'Dietrich-Mante', 2, 'http://dummyimage.com/171x100.png/dddddd/000000', 6, '2021-12-06T23:46:47Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (52, 'Bogan-Zemlak', 3, 'http://dummyimage.com/189x100.png/5fa2dd/ffffff', 6, '2021-06-22T15:20:46Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (53, 'Strosin Group', 2, 'http://dummyimage.com/191x100.png/5fa2dd/ffffff', 6, '2021-12-31T15:16:13Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (54, 'Sawayn, Murray and Adams', 1, 'http://dummyimage.com/213x100.png/dddddd/000000', 6, '2021-05-03T14:58:42Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (55, 'Prosacco Inc', 1, 'http://dummyimage.com/224x100.png/cc0000/ffffff', null, null);
insert into post (id, title, text, url, "creatorId", "createdAt") values (56, 'Rohan Group', 1, 'http://dummyimage.com/119x100.png/5fa2dd/ffffff', 6, '2021-03-21T16:17:17Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (57, 'Kunze-O''Connell', 1, 'http://dummyimage.com/195x100.png/dddddd/000000', 6, '2021-02-11T07:18:58Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (58, 'Mante Group', 1, 'http://dummyimage.com/209x100.png/cc0000/ffffff', 6, '2021-10-04T19:55:30Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (59, 'Mills, Stokes and Runolfsdottir', 1, 'http://dummyimage.com/238x100.png/5fa2dd/ffffff', 6, '2021-05-05T22:53:44Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (60, 'Prosacco-Torphy', 1, 'http://dummyimage.com/105x100.png/ff4444/ffffff', 6, '2021-12-25T20:00:04Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (61, 'Dach and Sons', 3, 'http://dummyimage.com/136x100.png/ff4444/ffffff', 6, '2021-10-30T12:33:37Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (62, 'Stark-Douglas', 3, 'http://dummyimage.com/107x100.png/cc0000/ffffff', 6, '2021-01-09T02:43:51Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (63, 'Little-Ferry', 2, 'http://dummyimage.com/142x100.png/5fa2dd/ffffff', 6, '2021-09-16T17:55:10Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (64, 'Farrell, Johns and Veum', 2, 'http://dummyimage.com/104x100.png/cc0000/ffffff', 6, '2021-11-30T03:14:37Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (65, 'Bashirian, O''Hara and Lynch', 2, 'http://dummyimage.com/181x100.png/dddddd/000000', 6, '2021-09-19T23:43:52Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (66, 'Raynor Inc', 3, 'http://dummyimage.com/165x100.png/ff4444/ffffff', 6, '2022-01-06T07:20:45Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (67, 'Okuneva LLC', 2, 'http://dummyimage.com/179x100.png/ff4444/ffffff', 6, '2021-10-29T03:10:45Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (68, 'Jones, Schmitt and Dare', 3, 'http://dummyimage.com/146x100.png/5fa2dd/ffffff', 6, '2021-06-02T07:55:31Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (69, 'Hoeger, Koelpin and Hammes', 1, 'http://dummyimage.com/153x100.png/ff4444/ffffff', 6, '2022-01-13T20:11:01Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (70, 'Welch and Sons', 2, 'http://dummyimage.com/143x100.png/5fa2dd/ffffff', 6, '2021-11-18T23:59:32Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (71, 'Mayer-Schmidt', 1, 'http://dummyimage.com/201x100.png/dddddd/000000', 6, '2021-05-25T17:44:44Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (72, 'Little Inc', 1, 'http://dummyimage.com/188x100.png/cc0000/ffffff', 6, '2021-07-17T14:25:49Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (73, 'Harber, Ondricka and Kassulke', 1, 'http://dummyimage.com/180x100.png/cc0000/ffffff', 6, '2021-09-06T01:03:51Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (74, 'Emmerich, Schneider and Marquardt', 3, 'http://dummyimage.com/230x100.png/5fa2dd/ffffff', 6, '2021-07-05T01:32:44Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (75, 'Heathcote and Sons', 5, 'http://dummyimage.com/122x100.png/ff4444/ffffff', 6, '2021-11-17T15:22:41Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (76, 'O''Reilly, Kuvalis and McDermott', 2, 'http://dummyimage.com/230x100.png/5fa2dd/ffffff', 6, '2021-10-15T09:13:23Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (77, 'Littel-Lockman', 1, 'http://dummyimage.com/140x100.png/5fa2dd/ffffff', 6, '2021-06-10T00:41:55Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (78, 'Runolfsson-Beatty', 2, 'http://dummyimage.com/165x100.png/dddddd/000000', 6, '2021-07-25T01:30:27Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (79, 'Stanton, Graham and Rowe', 1, 'http://dummyimage.com/143x100.png/dddddd/000000', 6, '2021-12-30T08:18:19Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (80, 'Bernhard, Wehner and Bruen', 11, 'http://dummyimage.com/153x100.png/5fa2dd/ffffff', 6, '2021-06-05T19:33:10Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (81, 'Turner, Schultz and Heaney', 1, 'http://dummyimage.com/108x100.png/dddddd/000000', 6, '2021-04-13T22:21:10Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (82, 'Gislason Inc', 2, 'http://dummyimage.com/241x100.png/5fa2dd/ffffff', 6, '2021-07-26T00:06:10Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (83, 'Corkery, Willms and Beer', 3, 'http://dummyimage.com/230x100.png/dddddd/000000', 6, '2021-04-08T10:29:07Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (84, 'Kiehn, Douglas and Rippin', 1, 'http://dummyimage.com/169x100.png/dddddd/000000', 6, '2021-05-20T06:38:40Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (85, 'Lowe-Mueller', 1, 'http://dummyimage.com/193x100.png/dddddd/000000', 6, '2021-04-14T11:32:18Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (86, 'Rice-Murray', 2, 'http://dummyimage.com/160x100.png/5fa2dd/ffffff', 6, '2021-02-28T21:05:39Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (87, 'Medhurst-Yundt', 3, 'http://dummyimage.com/166x100.png/ff4444/ffffff', 6, '2021-11-01T17:13:46Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (88, 'Bechtelar-Beatty', 2, 'http://dummyimage.com/163x100.png/dddddd/000000', 6, '2021-05-24T13:50:05Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (89, 'Hermiston LLC', 1, 'http://dummyimage.com/218x100.png/ff4444/ffffff', 6, '2021-03-12T12:44:05Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (90, 'Collins Group', 2, 'http://dummyimage.com/164x100.png/dddddd/000000', 6, '2021-04-20T09:41:07Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (91, 'Upton, Batz and Mann', 1, 'http://dummyimage.com/193x100.png/5fa2dd/ffffff', 6, '2021-05-09T05:28:48Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (92, 'Nicolas-Bauch', 3, 'http://dummyimage.com/220x100.png/cc0000/ffffff', 6, '2021-04-30T22:20:21Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (93, 'Wuckert, Harvey and Cartwright', 2, 'http://dummyimage.com/168x100.png/5fa2dd/ffffff', 6, '2021-05-12T09:18:06Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (94, 'Will-Hand', 1, 'http://dummyimage.com/248x100.png/ff4444/ffffff', 6, '2021-04-08T10:47:26Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (95, 'Rau, Ebert and Koelpin', 2, 'http://dummyimage.com/161x100.png/ff4444/ffffff', 6, '2021-06-10T04:18:44Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (96, 'Baumbach-Leuschke', 3, 'http://dummyimage.com/238x100.png/5fa2dd/ffffff', 6, '2021-07-26T07:50:04Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (97, 'Johnston, Lind and Morar', 1, 'http://dummyimage.com/206x100.png/5fa2dd/ffffff', 6, '2021-12-03T18:48:55Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (98, 'Goodwin Group', 1, 'http://dummyimage.com/205x100.png/ff4444/ffffff', 6, '2021-04-06T18:29:45Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (99, 'Skiles-Spencer', 1, 'http://dummyimage.com/111x100.png/dddddd/000000', 6, '2021-07-30T09:51:35Z');
insert into post (id, title, text, url, "creatorId", "createdAt") values (100, 'Yundt Inc', 1, 'http://dummyimage.com/210x100.png/ff4444/ffffff', 6, '2021-09-08T04:29:13Z');


`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
