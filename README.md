# HyperAutoQA
QA-сервис
### Используемые фреймворки
Angular 5 - клиент <br>
Symfony 3.4 - сервер
### Установка
Склонировать проект
<pre>git clone https://github.com/PakSerVal/HyperAutoQA.git</pre>
В директории с сервером
<pre>
composer install
php bin/console doctrine:schema:update --force
</pre>
В директории клиента
<pre>
npm install
ng build
</pre>
#### Пример конфигурации веб-сервера nginx находится в корне репозитория
<a href="https://github.com/PakSerVal/HyperAutoQA/blob/master/nginx-example.conf">nginx-example.conf</a>

По умолчанию Angular в качестве API url бэкенда использует http://www.hyperautoqa.loc/api. Его можно изменить в файле /client/app/src/environments/environment.ts. <br>

### Документация API: 
`GET /api/doc`
### Скрины клиента

#### Форма регистрации
![Alt text](/screens/registration.png?raw=true "Форма регистрации")
#### Форма входа в систему
![Alt text](/screens/login.png?raw=true "Форма входа в систему")
#### Список вопросов
![Alt text](/screens/question-list.png?raw=true "Список вопросов")
#### Вопрос с ответами
![Alt text](/screens/question-details.png?raw=true "Вопрос с ответами")
