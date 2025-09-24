import csv, json

# Test cases

tests = [
    # 1. All valid (happy path)
    (1, {"classroom_id":"CLS-001","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"90","assigned_supervisor":"sup123"},
     "Accepted"),
   
    # 2–8. Single missing required fields
    (2, {"classroom_id":"","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),
    (3, {"classroom_id":"CLS-001","linked_course_id":"","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),
    (4, {"classroom_id":"CLS-001","linked_course_id":"COURSE-101","existing_lessons_id":"",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),
    (5, {"classroom_id":"CLS-001","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"","end_date":"2025-12-15","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),
    (6, {"classroom_id":"CLS-001","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),
    (7, {"classroom_id":"CLS-001","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"","assigned_supervisor":"sup123"},
     "Validation error"),
    (8, {"classroom_id":"CLS-001","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"90","assigned_supervisor":""},
     "Validation error"),
    
    # 9. Existing classroom id
    (9, {"classroom_id":"CLS-001","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),



    #10 . Multiple missing
    (10, {"classroom_id":"","linked_course_id":"","existing_lessons_id":"LESS-202",
         "start_date":"2025-10-01","end_date":"2025-12-15","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),
    
    #11 . All empty
    (11, {"classroom_id":"","linked_course_id":"","existing_lessons_id":"",
          "start_date":"","end_date":"","duration":"","assigned_supervisor":""},
     "Validation error")

     #12 extreme date
    (9, {"classroom_id":"CLS-003","linked_course_id":"COURSE-101","existing_lessons_id":"LESS-202",
         "start_date":"1111-11-1111","end_date":"3111-31-3111","duration":"90","assigned_supervisor":"sup123"},
     "Validation error"),
]





filename = "testcaseus32.csv"

with open(filename, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f, lineterminator="\n", quoting=csv.QUOTE_ALL)  # ensure quoting

    writer.writerow(["Test ID","Description","Inputs","Expected Output","Actual Output","Pass/Fail"])
    for tid, inputs, expected in tests:
        pretty_inputs = json.dumps(inputs,indent=2)
        writer.writerow([tid, "to test classroom details", pretty_inputs, expected, "", ""])

print(f"CSV file created: {filename}")
