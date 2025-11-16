DROP DATABASE IF EXISTS  rf_db;
CREATE DATABASE IF NOT EXISTS rf_db;
USE rf_db;

drop table IF EXISTs user;
CREATE TABLE user(
	user_id   VARCHAR(20) NOT NULL,
    password  VARCHAR(255),
    CONSTRAINT pk_user PRIMARY KEY (user_id)
);

drop table IF EXISTs food;
CREATE TABLE food(
	food_id    INT AUTO_INCREMENT NOT NULL,
    food_name  VARCHAR(20),
    CONSTRAINT pk_food PRIMARY KEY (food_id)
);
drop table IF EXISTs allergy;
CREATE TABLE allergy(
	allergy_id    INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    allergy_name  VARCHAR(20)
);

drop table IF EXISTs category;
CREATE TABLE category(
	category_id    INT NOT NULL,
    category_name  VARCHAR(20),
    CONSTRAINT pk_category PRIMARY KEY (category_id)
);

drop table IF EXISTs user_allergy;
CREATE TABLE user_allergy(
	user_id      VARCHAR(20),
    allergy_id   INT,
	FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (allergy_id) REFERENCES allergy(allergy_id) ON UPDATE CASCADE ON DELETE CASCADE
);

drop table IF EXISTs food_allergy;
CREATE TABLE food_allergy(
	food_id      INT,
    allergy_id   INT,
	FOREIGN KEY (food_id) REFERENCES food(food_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (allergy_id) REFERENCES allergy(allergy_id) ON UPDATE CASCADE ON DELETE CASCADE
);

drop table IF EXISTs food_category;
CREATE TABLE food_category(
	food_id      INT,
    category_id   INT,
	FOREIGN KEY (food_id) REFERENCES food(food_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON UPDATE CASCADE ON DELETE CASCADE
)engine = InnoDB;


# 카테고리 ------------------------------------------------------------------------------------------
insert into category values(1, '한식');
insert into category values(2, '중식');
insert into category values(3, '양식');
insert into category values(4, '일식');
insert into category values(5, '디저트');
insert into category values(6, '랜덤');
# 🥘 한식 ------------------------------------------------------------------------------------------
insert into food(food_name) values('된장찌개');
insert into food(food_name) values('김치찌개');
insert into food(food_name) values('비빔밥');
insert into food(food_name) values('불고기');
insert into food(food_name) values('갈비찜');
insert into food(food_name) values('잡채');
insert into food(food_name) values('김밥');
insert into food(food_name) values('떡볶이');
insert into food(food_name) values('순두부찌개');
insert into food(food_name) values('삼계탕');
insert into food(food_name) values('부대찌개');
insert into food(food_name) values('해물파전');
insert into food(food_name) values('감자탕');
insert into food(food_name) values('제육볶음');
insert into food(food_name) values('오징어볶음');
insert into food(food_name) values('낙지볶음');
insert into food(food_name) values('갈비탕');
insert into food(food_name) values('설렁탕');
insert into food(food_name) values('콩나물국밥');
insert into food(food_name) values('추어탕');
insert into food(food_name) values('동태찌개');
insert into food(food_name) values('청국장');
insert into food(food_name) values('육개장');
insert into food(food_name) values('장어구이');
insert into food(food_name) values('떡국');
insert into food(food_name) values('쭈꾸미볶음');
insert into food(food_name) values('감자조림');
insert into food(food_name) values('계란찜');
insert into food(food_name) values('닭갈비');
insert into food(food_name) values('코다리조림');
# 🍜 중식 -------------------------------------------------------------------------
insert into food(food_name) values('짜장면');
insert into food(food_name) values('짬뽕');
insert into food(food_name) values('탕수육');
insert into food(food_name) values('깐풍기');
insert into food(food_name) values('양장피');
insert into food(food_name) values('팔보채');
insert into food(food_name) values('유산슬');
insert into food(food_name) values('마파두부');
insert into food(food_name) values('고추잡채');
insert into food(food_name) values('멘보샤');
insert into food(food_name) values('춘권');
insert into food(food_name) values('마라탕');
insert into food(food_name) values('마라샹궈');
insert into food(food_name) values('꿔바로우');
insert into food(food_name) values('딤섬');
insert into food(food_name) values('소룡포');
insert into food(food_name) values('북경오리');
insert into food(food_name) values('볶음밥');
insert into food(food_name) values('고량주닭날개');
insert into food(food_name) values('우육면');
insert into food(food_name) values('사천탕면');
insert into food(food_name) values('라조기');
insert into food(food_name) values('동파육');
insert into food(food_name) values('해물누룽지탕');
insert into food(food_name) values('양고기꼬치');
insert into food(food_name) values('건두부볶음');
insert into food(food_name) values('계란토마토볶음');
insert into food(food_name) values('피단두부');
insert into food(food_name) values('중국식 가지볶음');
insert into food(food_name) values('깐쇼새우');
# 🥩 양식 -------------------------------------------------------------------------
insert into food(food_name) values('스테이크');
insert into food(food_name) values('파스타');
insert into food(food_name) values('리조또');
insert into food(food_name) values('피자');
insert into food(food_name) values('라자냐');
insert into food(food_name) values('햄버거');
insert into food(food_name) values('프렌치프라이');
insert into food(food_name) values('샐러드');
insert into food(food_name) values('크림수프');
insert into food(food_name) values('토마토수프');
insert into food(food_name) values('치킨커틀릿');
insert into food(food_name) values('포크찹');
insert into food(food_name) values('미트볼');
insert into food(food_name) values('클램차우더');
insert into food(food_name) values('칠리콘카르네');
insert into food(food_name) values('감바스');
insert into food(food_name) values('카르보나라');
insert into food(food_name) values('알리오올리오');
insert into food(food_name) values('베이컨에그샌드위치');
insert into food(food_name) values('프렌치토스트');
insert into food(food_name) values('오믈렛');
insert into food(food_name) values('에그베네딕트');
insert into food(food_name) values('뇨끼');
insert into food(food_name) values('필레미뇽');
insert into food(food_name) values('치킨시저샐러드');
insert into food(food_name) values('바베큐립');
insert into food(food_name) values('머쉬룸스테이크');
insert into food(food_name) values('치즈버거');
insert into food(food_name) values('크로크무슈');
insert into food(food_name) values('로스트치킨');
# 🍣 일식 -------------------------------------------------------------------------
insert into food(food_name) values('초밥');
insert into food(food_name) values('사시미');
insert into food(food_name) values('돈까스');
insert into food(food_name) values('가츠동');
insert into food(food_name) values('규동');
insert into food(food_name) values('라멘');
insert into food(food_name) values('우동');
insert into food(food_name) values('소바');
insert into food(food_name) values('덴푸라');
insert into food(food_name) values('야키소바');
insert into food(food_name) values('오코노미야키');
insert into food(food_name) values('타코야끼');
insert into food(food_name) values('나베');
insert into food(food_name) values('샤브샤브');
insert into food(food_name) values('스키야키');
insert into food(food_name) values('오야코동');
insert into food(food_name) values('에비동');
insert into food(food_name) values('가라아게');
insert into food(food_name) values('니쿠자가');
insert into food(food_name) values('다마고야끼');
insert into food(food_name) values('멘치카츠');
insert into food(food_name) values('모둠초밥');
insert into food(food_name) values('차완무시');
insert into food(food_name) values('일본식카레');
insert into food(food_name) values('야키토리');
insert into food(food_name) values('미소시루');
insert into food(food_name) values('츠케멘');
insert into food(food_name) values('히야시추카');
insert into food(food_name) values('카이센동');
insert into food(food_name) values('이나리즈시');
# 🍰 디저트 -------------------------------------------------------------------------
insert into food(food_name) values('티라미수');
insert into food(food_name) values('치즈케이크');
insert into food(food_name) values('초콜릿 무스');
insert into food(food_name) values('크렘 브륄레');
insert into food(food_name) values('에클레어');
insert into food(food_name) values('마카롱');
insert into food(food_name) values('푸딩');
insert into food(food_name) values('젤라또');
insert into food(food_name) values('파블로바');
insert into food(food_name) values('바클라바');
insert into food(food_name) values('애플파이');
insert into food(food_name) values('브라우니');
insert into food(food_name) values('팬케이크');
insert into food(food_name) values('와플');
insert into food(food_name) values('도넛');
insert into food(food_name) values('마들렌');
insert into food(food_name) values('카놀리');
insert into food(food_name) values('롤케이크');
insert into food(food_name) values('밀푀유');
insert into food(food_name) values('몽블랑');
insert into food(food_name) values('슈크림');
insert into food(food_name) values('바나나스플릿');
insert into food(food_name) values('카라멜푸딩');
insert into food(food_name) values('레드벨벳케이크');
insert into food(food_name) values('트라이플');
insert into food(food_name) values('크럼블');
insert into food(food_name) values('하겐다즈 아이스크림');
insert into food(food_name) values('팥빙수');
insert into food(food_name) values('인절미토스트');
insert into food(food_name) values('경단');

# 💊 알러지 -------------------------------------------------------------------------
INSERT INTO allergy (allergy_name) VALUES
('우유'), ('계란'), ('밀'), ('땅콩'), ('대두'), ('호두'), ('고등어'), ('게'), ('새우'), ('돼지고기'), 
('쇠고기'), ('닭고기'), ('오징어'), ('메밀'), ('조개류'), ('생선'), ('견과류'), ('바나나'), ('토마토');

# 음식 카테고리 매핑 -------------------------------------------------------------------------
--  한식
INSERT INTO food_category (food_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
(11, 1), (12, 1), (13, 1), (14, 1), (15, 1), (16, 1), (17, 1), (18, 1), (19, 1), (20, 1),
(21, 1), (22, 1), (23, 1), (24, 1), (25, 1), (26, 1), (27, 1), (28, 1), (29, 1), (30, 1);
-- 중식
INSERT INTO food_category (food_id, category_id) VALUES 
(31, 2), (32, 2), (33, 2), (34, 2), (35, 2), (36, 2), (37, 2), (38, 2), (39, 2), (40, 2),
(41, 2), (42, 2), (43, 2), (44, 2), (45, 2), (46, 2), (47, 2), (48, 2), (49, 2), (50, 2),
(51, 2), (52, 2), (53, 2), (54, 2), (55, 2), (56, 2), (57, 2), (58, 2), (59, 2), (60, 2);
-- 양식
INSERT INTO food_category (food_id, category_id) VALUES 
(61, 3), (62, 3), (63, 3), (64, 3), (65, 3), (66, 3), (67, 3), (68, 3), (69, 3), (70, 3),
(71, 3), (72, 3), (73, 3), (74, 3), (75, 3), (76, 3), (77, 3), (78, 3), (79, 3), (80, 3),
(81, 3), (82, 3), (83, 3), (84, 3), (85, 3), (86, 3), (87, 3), (88, 3), (89, 3), (90, 3);
-- 일식
INSERT INTO food_category (food_id, category_id) VALUES 
(91, 4), (92, 4), (93, 4), (94, 4), (95, 4), (96, 4), (97, 4), (98, 4), (99, 4), (100, 4),
(101, 4), (102, 4), (103, 4), (104, 4), (105, 4), (106, 4), (107, 4), (108, 4), (109, 4), (110, 4),
(111, 4), (112, 4), (113, 4), (114, 4), (115, 4), (116, 4), (117, 4), (118, 4), (119, 4), (120, 4);
-- 디저트
INSERT INTO food_category (food_id, category_id) VALUES 
(121, 5), (122, 5), (123, 5), (124, 5), (125, 5), (126, 5), (127, 5), (128, 5), (129, 5), (130, 5),
(131, 5), (132, 5), (133, 5), (134, 5), (135, 5), (136, 5), (137, 5), (138, 5), (139, 5), (140, 5),
(141, 5), (142, 5), (143, 5), (144, 5), (145, 5), (146, 5), (147, 5), (148, 5), (149, 5), (150, 5);

# 회원 등록 -------------------------------------------------------------------
INSERT INTO user (user_id, password) VALUES
('kimjjang', 'p3k11'),
('hong123', '1234'),
('ganghu', '4567');

# 사용자-알러지 등록 -------------------------------------------------------------------------
INSERT INTO user_allergy (user_id, allergy_id) VALUES
('kimjjang', 1),  -- 우유
('kimjjang', 7),  -- 고등어
('hong123', 5);   -- 대두

# 음식 알러지 매핑 -------------------------------------------------------------------------
-- 한식
INSERT INTO food_allergy (food_id, allergy_id) VALUES
(1, 5),  -- 된장찌개 - 대두 
(2, 10),  -- 김치찌개 - 돼지고기  
(3, 2), -- 비빔밥 - 계란
(4, 11), (5, 11), (6, 3), (7, 2), (8, 3), (9, 5), (10, 12),
(11, 10), (12, 3), (13, 10), (14, 10), (15, 13), (16, 13), (17, 11), (18, 11), (19, 5), (20, 14),
(21, 5), (22, 5), (23, 11), (24, 5), (25, 2), (26, 13), (27, 5), (28, 2), (29, 12), (30, 5);
-- 중식
INSERT INTO food_allergy (food_id, allergy_id) VALUES
(31, 3), (32, 9), (33, 2), (34, 12), (35, 3), (36, 9), (37, 13), (38, 5), (39, 10), (40, 9),
(41, 3), (42, 5), (43, 5), (44, 10), (45, 3), (46, 10), (47, 5), (48, 2), (49, 12), (50, 11),
(51, 3), (52, 12), (53, 10), (54, 15), (55, 5), (56, 5), (57, 2), (58, 5), (59, 5), (60, 9);
-- 양식
INSERT INTO food_allergy (food_id, allergy_id) VALUES
(61, 11), (62, 3), (63, 1), (64, 3), (65, 3), (66, 3), (67, 5), (68, 2), (69, 1), (70, 19),
(71, 12), (72, 10), (73, 11), (74, 15), (75, 11), (76, 9), (77, 1), (78, 5), (79, 2), (80, 2),
(81, 2), (82, 2), (83, 3), (84, 11), (85, 2), (86, 10), (87, 11), (88, 1), (89, 1), (90, 12);
-- 일식
INSERT INTO food_allergy (food_id, allergy_id) VALUES
(91, 16), (92, 16), (93, 3), (94, 2), (95, 11), (96, 3), (97, 3), (98, 3), (99, 3), (100, 3),
(101, 3), (102, 3), (103, 5), (104, 11), (105, 11), (106, 12), (107, 9), (108, 12), (109, 11), (110, 2),
(111, 3), (112, 16), (113, 2), (114, 3), (115, 12), (116, 5), (117, 3), (118, 3), (119, 15), (120, 5);
-- 디저트
INSERT INTO food_allergy (food_id, allergy_id) VALUES
(121, 1), (122, 1), (123, 2), (124, 2), (125, 3), (126, 2), (127, 2), (128, 1), (129, 2), (130, 17),
(131, 3), (132, 2), (133, 3), (134, 3), (135, 3), (136, 3), (137, 1), (138, 2), (139, 3), (140, 1),
(141, 1), (142, 18), (143, 2), (144, 3), (145, 1), (146, 3), (147, 1), (148, 1), (149, 5), (150, 5);

-- 10. 데이터 확인 쿼리
-- 유저 목록
SELECT * FROM user;

-- 음식 수
SELECT COUNT(*) AS total_foods FROM food;

-- 알러지 목록
SELECT * FROM allergy;

-- 카테고리별 음식 수
SELECT c.category_name, COUNT(*) AS food_count
FROM category c
JOIN food_category fc ON c.category_id = fc.category_id
GROUP BY c.category_id;

-- 유저별 알러지
SELECT ua.user_id, a.allergy_name
FROM user_allergy ua
JOIN allergy a ON ua.allergy_id = a.allergy_id;

-- 음식별 알러지
SELECT f.food_name, a.allergy_name
FROM food_allergy fa
JOIN food f ON fa.food_id = f.food_id
JOIN allergy a ON fa.allergy_id = a.allergy_id;

-- 밀 알러지
SELECT f.food_id, f.food_name
FROM food f
JOIN food_allergy fa ON f.food_id = fa.food_id
JOIN allergy a ON fa.allergy_id = a.allergy_id
WHERE a.allergy_name = '밀';

-- 랜덤
SELECT f.*
FROM food f
WHERE f.food_id NOT IN (
    SELECT fa.food_id
    FROM food_allergy fa
    JOIN user_allergy ua ON fa.allergy_id = ua.allergy_id
    WHERE ua.user_id = ?
)
ORDER BY RAND()
LIMIT 1;
