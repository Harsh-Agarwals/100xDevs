from redis import Redis
from rq import Queue
from flask import Flask, request, jsonify
from worker import process_submission

app = Flask(__name__)

redis_conn = Redis(host='localhost', port=6379)
queue = Queue(connection=redis_conn)

@app.route('/submit', methods=['POST'])
def submit_problem():
    data = request.json

    problem_id = data.get('problem_id')
    solution = data.get('solution')

    if not problem_id or not solution:
        return jsonify({'error': 'MISSING problem_id or solution'}), 400
    
    # push job to RQ queue
    job = queue.enqueue(process_submission, problem_id, solution)

    return jsonify({
        'message': 'Submission queued',
        'job_id': job.id
    }), 202

if __name__ == "__main__":
    app.run(debug=True, port=5000)