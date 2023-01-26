const { Command } = require("../Model/Command");
const amqplib = require('amqplib/callback_api');
const queue = 'command';

const create = (req, res) => {
	Command.create(req.body)
		.then((result) => {
			amqplib.connect('amqp://rabbitmq', (err, conn) => {
				if (err) throw err;

				// Sender
				conn.createChannel((err, ch1) => {
					if (err) throw err;

					ch1.assertQueue(queue);

					const data = {
							id: result._id
					};

					ch1.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
				});
			});
			res.status(201).json(result)
		})
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue",
		}))
}

const getId = (req, res) => {
	let id = req.params.id;
	Command.findOne({ _id: id })
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(404).json({
			message: `la commande ${id} n'a pas été trouvée`
		}))
}

const getAll = (req, res) => {
	Command.find({})
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue"
		}))
}

const put = (req, res) => {
	Command.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, runValidators: true })
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue"
		}))
}

const deleteId = (req, res) => {
	let id = req.params.id;
	Command.findOneAndDelete({ _id: id })
		.then((result) => res.status(204).json({}))
		.catch((error) => res.status(404).json({
			message: `la commande ${id} n'a pas été trouvée`
		}))
}

module.exports = {
  create,
	getId,
	getAll,
	put,
	deleteId,
}