import time

def process_submission(problem_id, solution):
    print(f"Processing submission for problem {problem_id} with solution: {solution}")
    time.sleep(5)
    print(f"Finished processing submission for problem {problem_id}")
    return {
        'problem_id': problem_id,
        'status': 'processed',
        'result': f'Solution has been processed successfully.'
    }