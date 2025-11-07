var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('componentes', {
    title: 'Componentes',
    data: {},
    errors: {}
  });
});

router.post('/',
  // Validações e sanitizações
  [
    body('nome')
    .notEmpty().withMessage('Selecione um nome.')
    .isIn(['mario', 'luigi', 'peach', 'bowser']).withMessage('Selecione um nome válido.'),

    body('idade')
    .trim().isLength({ min: 3, max: 60 }).withMessage('Nome deve ter entre 3 e 60 caracteres.')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/).withMessage('Nome contém caracteres inválidos.')
    .escape(),

    body('genero')
    .notEmpty().withMessage('Deslize o controle e escolha!')
    .isIn(['0', '25', '50', '75', '100'])
    .withMessage('Valor de gênero inválido.'),
   ],
(req, res) => {
    const errors = validationResult(req);

    const data = {
      nome: req.body.nome,
      idade: req.body.idade,
      genero: req.body.genero || ''
    };

    if (!errors.isEmpty()) {
      const mapped = errors.mapped();
      return res.status(400).render('componentes', {
        title: 'Componentes',
        data,
        errors: mapped
      });
    }

    // Aqui você pode salvar os dados, por exemplo em JSON ou BD
    return res.render('componentes-sucesso', {
      title: 'Enviado com sucesso',
      data
    });
  }
);

module.exports = router;