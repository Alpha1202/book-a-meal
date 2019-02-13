import fs from 'fs';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../api/index';
import Menu from '../api/models/menu';

const { assert, expect, use } = chai;

use(chaiHTTP);

const API_PREFIX = '/api/v1';

const p = './api/data/menu.json';

const getMenusFromFile = () => {
  return new Promise(resolve => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        resolve([]);
      } else {
        resolve(JSON.parse(fileContent));
      }
    });
  });
};

const payload = {
  mealId: 2,
  quantity: 10
};

describe('Menu Endpoints', () => {
  it(`GET ${API_PREFIX}/menu/ - Fetch All Menus`, done => {
    chai
      .request(app)
      .get(`${API_PREFIX}/menu/`)
      .then(async res => {
        expect(res).to.have.status(200);
        const menusFromFile = await getMenusFromFile();
        expect(menusFromFile).to.eql(res.body.data);
        done();
      })
      .catch(err => console.log('GET /menu/', err.message));
  });
  it(`POST ${API_PREFIX}/menu/ - Add Meal to Menu`, done => {
    chai
      .request(app)
      .post(`${API_PREFIX}/menu/`)
      .send(payload)
      .then(async res => {
        expect(res).to.have.status(200);
        assert.equal(res.body.status, 'success');
        const menuFromFile = await Menu.fetchOneMenu();
        const menuMeals = menuFromFile.meals;
        expect(Number(menuMeals[menuMeals.length - 1].id)).to.equal(2);
        expect(menuMeals[menuMeals.length - 1].quantity).to.equal(10);
        await Menu.deleteMealFromMenu(2);
        done();
      })
      .catch(err => console.log('POST /menu/', err.message));
  });
});
