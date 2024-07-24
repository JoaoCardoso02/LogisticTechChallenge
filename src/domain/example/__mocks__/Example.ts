import Example from '@domain/example/entities/Example'

export const exampleMock = new Example({
	id: 1,
	age: 20,
	name: 'fake name',
})

export const exampleGotMock = {
	id: 1,
	age: 20,
	name: 'fake name',
}

export const exampleUpdatedMock = new Example({
	id: 1,
	age: 30,
	name: 'fake name to update',
})

export const exampleToUpdateMock = {
	age: 30,
	name: 'fake name to update',
}

export const exampleToCreateMock = {
	age: 30,
	name: 'fake name to update',
}

export const exampleDeletedRawMock = {
	affected: 1,
}

export const exampleFailDeleteRawMock = {
	affected: 0,
}
