# Brainify

> **Note:** This project is still in planning and development. These are our ambitions, **we are students and also have school to work on!**

**Brainify** is an under development project, our idea is to make a **clean and reliable** revision tool that students can use to further their understanding of a subject.

I came up with this idea when doing revision for my end of year exams, and I though why not make **a revision platform made for students by students**!

# Our Plan

Our plan is to make an **easy to use revision tool** that students can use to help further their education. Our main focus is **science**, with out eyes set on other subjects such as **maths** and **english**. Our plans for our resources are to ask **real teachers** for content to put in our recorces.

## Not Just For Students!

Teachers will also benifit from Brainify, with a dashboard to see students progress, and methods to set classwork or homework.

# Development Notes

> **Note:** Below is for development purposes only, it documents the processes we use as well as important information about the project overall.

## Account Types

Different accounts will have different permisions across the Brainify platform. Account types are split into three account types:
* _**Student Accounts**_ have no variations and are configured by the student on sign up.
* _**Teacher Accounts**_ have three variations. Subject Teacher, Head of Department and SLT. These variations affect the range of students a teacher can edit.
* _**Development Accounts**_ are not in use for the public and is used as a portal to update our questions and monitor other systems.

|  | Student | Subject Teacher | Head Of Department | SLT | Development |
| :-: | :-: | :-: | :-: | :-: | :-: |
| Complete Lessons |✅|❌|❌|❌|❌|
| Create Homeworks |❌|✅ |✅|✅|✅|
| Create Core Lessons |❌|❌|❌|❌|✅|


## Core Lessons
Core lessons are **lessons provided by Brainify**, applicable to the exam board specifications **(currently limited to AQA)**. Core lessons can only created by 
[development accounts](#account-types).


## JSON Formatting

```JSON
{
    "AQA": {
        "topic-id": {
            "lesson-id": {
                "lesson-config": {},
                "question-id": {}
            }
        }
    }
}
```

#### **_Information Pane_**
```JSON
{
 "information_title": "Title",
 "panes": [
    {
        "pane_title": "Title 1",
        "pane_body": "Information that will provide context to the lesson.",
        "media": {
            "required": true,
            "media_type": "image",
            "formatting": "before-body/after-body/end",
            "src": {
                "type": "external/internal",
                "src": "storage-path/url"
            }
        }
    },
    {
        "pane_title": "Title 2",
        "pane_body": "Information that will provide context to the lesson.",
        "media": {
            "required": true,
            "media_type": "video",
            "formatting": "before-body/after-body/end",
            "src": {
                "type": "external/internal",
                "src": "storage-path/url"
            }
        }
    },
    {
        "pane_title": "Title 3",
        "pane_body": "Information that will provide context to the lesson.",
        "media": {
            "required": false,
            "media_type": "",
            "formatting": "",
            "src": {
                "type": "",
                "src": ""
            }
        }
    }
 ]
}
```

### **Question Types**
#### **_Multiple Choice_**
```JSON
{
    "question_type": "multiple_choice",
    "question": {
        "multiple_choice": {
            "body": "This will provide the question or context to the options.",
            "type": "slider/check",
            "options": ["Option 0", "Option 1", "Option 2"],
            "correct_options": [0, 2],
        },
        "media": {
            "required": true,
            "media_type": "image/video",
            "formatting": "before-body/after-body/end",
            "src": {
                "type": "external/internal",
                "src": "storage-path/url"
            }
        },
        "total_marks": 2
    }
}
```

#### **_Word Fill_**
```JSON
{
    "question_type": "word_fill",
    "question": {
        "multiple_choice": {
            "body": "Word fill questions will be formated differently to other questions. Answer spaces will be symbolised by _*1*_, _*2*_.",
            "answers": [{
                "varient_answers": ["answer1", "solution1", "responce1"]
            }, {
                "varient_answers": ["answer2", "solution2", "responce2"]
            }]
        },
        "media": {
            "required": false,
            "media_type": "",
            "formatting": "",
            "src": {
                "type": "",
                "src": ""
            }
        },
        "total_marks": 2             
    }
}
```