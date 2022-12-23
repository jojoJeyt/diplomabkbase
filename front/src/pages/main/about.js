import React from 'react';


export const About = () => {
  return (
    <section id="about">
        <div class="container marketing">
            <div class="row">
                <div class="col-12">
                    <h2 class="about_title">О компании</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="about_place">
                        <p class="about_txt">В век современных технологий невозможно представить свою повседневную жизнь без компьютера. Однако технические проблемы ПК не являются редкостью. Очень важным в выбор сервиса по ремонту компьютеров является <strong>уровень профессионализма</strong>, с которым подходит компания к выполнению своей работы.</p>

                        <p class="about_txt">В нашей компании <strong>BK Base</strong> весь процесс осуществляется <strong>опытными специалистами</strong>, которым под силу справиться с задачей любой сложности. Мы предлагаем услуги по ремонту компьютеров.</p>

                        <p class="about_txt">Если у вас возникли вопросы, связанные с ремонтом ПК, или вы хотите получить профессиональную консультацию, сотрудники нашей компании с удовольствием <strong>ответят на все интересующие вас вопросы</strong>.</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4">
                    <img class="rounded-circle" src="/img/1.png" alt="Generic placeholder image" width="140" height="140"></img>
                    <h2>Гарантии</h2>
                    <p>Гарантия на услуги нашего сервисного центра от 2 месяцев до 1 года</p>
                </div>
                
                <div class="col-lg-4">
                    <img class="rounded-circle" src="/img/2.png" alt="Generic placeholder image" width="140" height="140"></img>
                    <h2>Сроки выполнения</h2>
                    <p>Выполняем задачи в короткие сроки.С нами вы экономите не только время но деньги.</p>
                </div>
                
                <div class="col-lg-4">
                    <img class="rounded-circle" src="/img/3.png" alt="Generic placeholder image" width="140" height="140"></img>
                    <h2>Опыт</h2>
                    <p>Опыт работы мастеров 5 лет, это нам позволяет справиться с любой задачей</p>
                </div>
            </div>

        </div>
    </section>
  );
}