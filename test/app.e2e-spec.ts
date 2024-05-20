import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let newListItemId = '';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
  it('/api/v1/my-list (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/my-list')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          success: true,
          data: {
            page: 1,
            perPage: 5,
            count: expect.any(Number),
            myList: expect.any(Array),
          },
        });
      });
  });

  it('/api/v1/my-list/add-item (POST)', () => {
    const body = {
      contentId: '6648c8795f68d0c48786fc05', // this id exist in db and belong to a tv show
      contentType: 'TV_SHOW',
    };

    return request(app.getHttpServer())
      .post('/api/v1/my-list/add-item')
      .send(body)
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        newListItemId = response.body.data.id;
        expect(response.body).toEqual({
          success: true,
          data: {
            id: expect.any(String),
          },
        });
      });
  });

  it('/api/v1/my-list/remove-item/:id (DELETE)', () => {
    const id = newListItemId;

    return request(app.getHttpServer())
      .delete(`/api/v1/my-list/remove-item/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          success: true,
          data: {
            removed: expect.any(Boolean),
            itemCount: expect.any(Number),
          },
        });
      });
  });
});
