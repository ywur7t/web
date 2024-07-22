from jinja2 import Environment, FileSystemLoader



students = [
    {'name': "Алина",
     'program': "Бизнес-информатика",
     'subjects': ["Базы данных",
                  "Программирование", "Эконометрика",
                  "Статистика"],
     'gender': 'ж'
     },
    {'name': "Вадим",
     'program': "Экономика",
     'subjects': ["Информатика",
                  "Теория игр", "Экономика", "Эконометрика",
                  "Статистика"],
     'gender': 'м'
     },
    {'name': "Ксения",
     'program': "Экономика",
     'subjects': ["Информатика",
                  "Теория игр",
                  "Статистика"],
     'gender': 'ж'
     }
]

def add_spaces(text):
    return " ".join(text)

def add_count(objects):
    count = len(objects)
    word = lambda count: " дисциплина:" if count % 10 == 1 and count % 100 != 11 else \
        " дисциплины:" if 2 <= count % 10 <= 4 and (count % 100 < 10 or count % 100 >= 20) else \
            " дисциплин:"
    return str(count) + word(count)


env = Environment(loader=FileSystemLoader('.'))
template = env.get_template('ind_test_template.html')
result_html = template.render(user = students[2],
                              add_spaces=add_spaces,
                              add_count=add_count)
f = open('ind_test.html', 'w', encoding='utf-8-sig')
f.write(result_html)
f.close()


env = Environment(loader = FileSystemLoader('.'))
template = env.get_template('test_template.html')
result_html = template.render(user = students[2],
                              add_spaces=add_spaces,
                              add_count=add_count)
f = open('test.html', 'w', encoding='utf-8-sig')
f.write(result_html)
f.close()