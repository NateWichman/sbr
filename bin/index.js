#!/usr/bin/env node

const fs = require('fs')

const args = process.argv.slice(2)

const componentName = args[0]
if (!componentName) {
  throw new Error('please provide a component name')
}

const path = args[1] || ''

const content = `
import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { ${componentName} } from "./${componentName.toLowerCase()}"

const story: ComponentMeta<typeof ${componentName}> = {
    title: "Components/${componentName}",
    component: ${componentName},
    argTypes: {
    },
    parameters: {
    },
  } as ComponentMeta<typeof ${componentName}>
export default story

const Template: ComponentStory<typeof ${componentName}> = (args) => (
    <${componentName} {...args}></${componentName}>
  )

export const Default = Template.bind({})
`

const firstLetter = componentName[0].toLowerCase()
const lastpart = componentName.slice(1).replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
const fileName = firstLetter + lastpart



fs.writeFile(`./${path}/${fileName}.stories.tsx`, content, err => {
  if (err) {
    console.error(err)
  }

  console.log('\x1b[35m', 'Created Story for ' + componentName + ' successfully. - 🦐')
})