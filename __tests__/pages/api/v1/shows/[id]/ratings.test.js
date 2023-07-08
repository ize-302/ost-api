import { createMocks } from "node-mocks-http";
import showRatingsHandler from '@/pages/api/v1/shows/[id]/ratings';

describe('/api/v1/shows/:id/ratings', () => {
  // ADD RATING
  it('Returns 400 status code error and error message when some fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        rating: null,
        comment: '',
      },
      query: {
        id: 1,
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await showRatingsHandler(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  })


  it('Add rating and returns 201 status code and success message if all fields are available', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        rating: 4,
        comment: 'my comment',
      },
      query: {
        id: 1,
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await showRatingsHandler(req, res);
    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        success: expect.any(String),
      }),
    );
  })

});