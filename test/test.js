import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 100,
    duration: '30s',
    iterations: 1000,
};

export default function () {
    http.get('http://localhost:3000/compose'); // nestjs
}
