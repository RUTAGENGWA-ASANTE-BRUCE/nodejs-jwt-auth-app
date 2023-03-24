const express = require('express');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { config } = require('../config/env');
const jwt = require('jsonwebtoken');
const jsonpatch = require('jsonpatch');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

const router = express.Router();

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate user and get a JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid username/password
 */

const loginRoute = router.post('/login', (req, res) => {
  // Mock authentication - accept any username/password
  const { username, password } = req.body;
  const token = jwt.sign({ username, password }, config.jwt_secret, {
    expiresIn: '1h',
  });
  res.json({ token });
});

/**
 * @swagger
 * /api/apply-json-patch:
 *   patch:
 *     summary: Apply a JSON Patch to a JSON object
 *     tags:
 *       - JSON Patch
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               json:
 *                 type: object
 *               patch:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     op:
 *                       type: string
 *                       enum: [add, remove, replace, move, copy, test]
 *                     path:
 *                       type: string
 *                     value:
 *                       type: any
 *             required:
 *               - json
 *               - patch
 *     responses:
 *       200:
 *         description: Returns the patched JSON object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid JSON or patch
 *       401:
 *         description: Unauthorized
 */

const jsonPatchRoute = router.patch(
  '/apply-json-patch',
  authenticateToken,
  (req, res) => {
    const { json, patch } = req.body;
    try {
      const patchedJson = jsonpatch.apply_patch(json, patch);
      res.json(patchedJson);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = { loginRoute, jsonPatchRoute };
