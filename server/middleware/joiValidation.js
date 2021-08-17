exports.validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body)
      const valid = error == null
      if (valid) {
        next()
      } else {
        const { details } = error
        const errorsDetail = details.map(i => i.message)
        res.status(422).json({
          status: false,
          error: errorsDetail
        })
      }
    }
  }